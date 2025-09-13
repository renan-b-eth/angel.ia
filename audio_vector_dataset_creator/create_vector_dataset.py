# create_vector_dataset.py
import os
import pandas as pd
import parselmouth
import numpy as np
import chromadb
import sys
from pathlib import Path

# --- Configurações ---
BASE_DIR = Path(__file__).parent
AUDIO_DIR = BASE_DIR / 'dataset_audios'
METADATA_FILE = BASE_DIR / 'metadata.csv'
CHROMA_DB_PATH = str(BASE_DIR / 'chroma_db')
COLLECTION_NAME = 'audio_features_collection'

REQUIRED_COLUMNS = ['filename', 'diagnosis']

# --- Funções de Extração (sem alterações) ---
def extract_features(audio_path: str) -> dict | None:
    try:
        sound = parselmouth.Sound(audio_path)
        pitch = sound.to_pitch(time_step=0.01, pitch_floor=75, pitch_ceiling=600)
        pulses = parselmouth.praat.call(sound, "To PointProcess (periodic, cc)", 75, 600)
        jitter_local = parselmouth.praat.call(pulses, "Get jitter (local)", 0, 0, 0.0001, 0.02, 1.3)
        shimmer_local = parselmouth.praat.call(pulses, "Get shimmer (local)", 0, 0, 0.0001, 0.02, 1.3, 1.6)
        mean_pitch = parselmouth.praat.call(pitch, "Get mean", 0, 0, "Hertz")
        harmonicity = parselmouth.praat.call(sound, "To Harmonicity (cc)", 0.01, 75, 0.1, 1.0)
        mean_hnr = parselmouth.praat.call(harmonicity, "Get mean", 0, 0)
        return {
            'jitter_local': jitter_local, 'shimmer_local': shimmer_local,
            'mean_pitch': mean_pitch, 'mean_hnr': mean_hnr
        }
    except Exception as e:
        print(f"    [AVISO] Erro ao extrair features de {os.path.basename(audio_path)}: {e}")
        return None

def get_feature_embedding(features_dict: dict) -> list[float]:
    ordered_features = [
        features_dict.get('jitter_local', 0.0),
        features_dict.get('shimmer_local', 0.0),
        features_dict.get('mean_pitch', 0.0),
        features_dict.get('mean_hnr', 0.0)
    ]
    return ordered_features

def read_and_validate_csv(filepath: Path) -> pd.DataFrame | None:
    """
    Lê o CSV de forma robusta, detectando delimitador e validando colunas.
    """
    print(f"--- Etapa 1: Lendo e validando o arquivo '{filepath.name}' ---")
    
    # Tenta ler com vírgula, se falhar ou resultar em uma coluna, tenta com ponto e vírgula
    try:
        df = pd.read_csv(filepath)
        if len(df.columns) == 1 and ';' in df.columns[0]:
             print("Detectado possível delimitador ';'. Tentando ler novamente...")
             df = pd.read_csv(filepath, delimiter=';')
    except Exception as e:
        print(f"[ERRO FATAL] Não foi possível ler o arquivo CSV. Erro do pandas: {e}")
        return None

    # Limpeza e Normalização dos Nomes das Colunas
    original_columns = df.columns.tolist()
    df.columns = [col.strip().lower().replace(' ', '_') for col in original_columns]
    print(f"Colunas originais encontradas: {original_columns}")
    print(f"Colunas normalizadas para uso: {df.columns.tolist()}")

    # Validação das Colunas Obrigatórias
    missing_cols = [col for col in REQUIRED_COLUMNS if col not in df.columns]
    if missing_cols:
        print("\n[ERRO FATAL] O arquivo CSV não contém as colunas obrigatórias.")
        print(f"Coluna(s) faltando: {', '.join(missing_cols)}")
        print("Por favor, verifique se a primeira linha do seu CSV contém os cabeçalhos 'filename' e 'diagnosis'.")
        return None
        
    print("Validação do CSV concluída com sucesso.\n")
    return df

def main():
    """Função principal para executar todo o processo."""
    
    # 1. Validar e carregar metadados
    if not METADATA_FILE.exists():
        print(f"[ERRO FATAL] Arquivo de metadados '{METADATA_FILE.name}' não encontrado.")
        sys.exit(1)
        
    metadata_df = read_and_validate_csv(METADATA_FILE)
    if metadata_df is None:
        sys.exit(1)

    # 2. Inicializar ChromaDB
    print(f"--- Etapa 2: Conectando ao Banco de Dados Vetorial ---")
    client = chromadb.PersistentClient(path=str(CHROMA_DB_PATH))
    collection = client.get_or_create_collection(name=COLLECTION_NAME)
    print(f"Conectado à coleção '{COLLECTION_NAME}'. Total de itens: {collection.count()}\n")

    # 3. Processar áudios e adicionar ao DB
    print(f"--- Etapa 3: Processando arquivos de áudio da pasta '{AUDIO_DIR.name}' ---")
    
    new_entries_count = 0
    for index, row in metadata_df.iterrows():
        filename = row['filename']
        audio_path = AUDIO_DIR / filename
        unique_id = f"audio_{os.path.splitext(filename)[0]}"

        # Verifica se o áudio já foi processado para evitar duplicatas
        if collection.get(ids=[unique_id])['ids']:
            print(f"'{filename}' já existe no banco de dados. Pulando.")
            continue
            
        if not audio_path.exists():
            print(f"[AVISO] Arquivo '{filename}' não encontrado na pasta de áudios. Pulando.")
            continue

        print(f"Processando '{filename}'...")
        features = extract_features(str(audio_path))
        
        if features:
            embedding = get_feature_embedding(features)
            
            metadata = {key: (str(value) if pd.notna(value) else "") for key, value in row.items()}
            metadata.update(features) # Adiciona as features numéricas também nos metadados
            
            collection.add(
                embeddings=[embedding],
                metadatas=[metadata],
                documents=[f"Análise de voz para {filename}"],
                ids=[unique_id]
            )
            new_entries_count += 1
            print(f"    -> Adicionado ao banco de dados com sucesso.")
    
    print("\n--- Processo Concluído ---")
    print(f"Novos áudios adicionados ao dataset: {new_entries_count}")
    print(f"Total de itens na coleção '{COLLECTION_NAME}': {collection.count()}")
    print(f"Banco de dados salvo em: '{CHROMA_DB_PATH}'")

if __name__ == "__main__":
    main()