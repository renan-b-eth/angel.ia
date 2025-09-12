// pages/ferramenta.tsx
import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';

// --- Tipos para o estado ---
type ToolState = 'idle' | 'recording' | 'processing' | 'results';

// --- Estilização ---
const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #0A192F;
  color: #CCD6F6;
  padding: 2rem;
`;

const ToolCard = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  background-color: #112240;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 10px 30px -15px rgba(2,12,27,0.7);
`;

const Title = styled.h1`
  font-family: 'Sora', sans-serif;
  font-size: 2rem;
  color: #FFF;
  margin-bottom: 1rem;
`;

const Instructions = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: #8892B0;
  margin-bottom: 2.5rem;
`;

const RecordButton = styled.button`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background-color: #E84D4D;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const spinnerAnimation = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 5px solid rgba(100, 255, 218, 0.2);
  border-top-color: #64FFDA;
  border-radius: 50%;
  animation: ${spinnerAnimation} 1s linear infinite;
  margin: 2rem auto;
`;

const ResultsCard = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  border: 1px solid #64FFDA;
  border-radius: 4px;
  background-color: rgba(100, 255, 218, 0.05);
`;

const ResultsTitle = styled.h3`
  font-family: 'Sora', sans-serif;
  color: #64FFDA;
  font-size: 1.5rem;
`;

const Disclaimer = styled.p`
  margin-top: 1rem;
  color: #FFC107;
  font-weight: bold;
`;

const BackLink = styled(Link)` /* Estilizando o Link diretamente */
  display: inline-block;
  margin-top: 2rem;
  color: #64FFDA;
  cursor: pointer;
`;


// --- Componente da Página ---
const Ferramenta: NextPage = () => {
  const [state, setState] = useState<ToolState>('idle');
  const [countdown, setCountdown] = useState(5);

  // Simula o processo de gravação e análise
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state === 'recording') {
      if (countdown > 0) {
        timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      } else {
        setState('processing');
      }
    } else if (state === 'processing') {
      timer = setTimeout(() => setState('results'), 3000); // Simula 3s de análise
    }
    return () => clearTimeout(timer);
  }, [state, countdown]);

  const handleStartRecording = () => {
    setCountdown(5); // Inicia contagem de 5 segundos
    setState('recording');
  };
  
  const handleReset = () => {
    setState('idle');
  };

  const renderContent = () => {
    switch (state) {
      case 'recording':
        return (
          <>
            <Title>Gravando...</Title>
            <Instructions>Fale continuamente sobre o seu dia.</Instructions>
            <RecordButton disabled>{countdown}</RecordButton>
          </>
        );
      case 'processing':
        return (
          <>
            <Title>Analisando sua voz...</Title>
            <Instructions>Nossa IA está processando os biomarcadores.</Instructions>
            <Spinner />
          </>
        );
      case 'results':
        return (
          <>
            <Title>Análise Concluída</Title>
            <ResultsCard>
              <ResultsTitle>Análise Preliminar</ResultsTitle>
              <p>Foram detectados padrões vocais que podem estar associados a condições neurodegenerativas. A variabilidade de pitch (jitter) apresentou-se ligeiramente elevada.</p>
              <Disclaimer>ATENÇÃO: Este não é um diagnóstico médico. Consulte um profissional de saúde para uma avaliação completa.</Disclaimer>
            </ResultsCard>
            <button onClick={handleReset} style={{marginTop: '2rem', padding: '10px 20px', cursor: 'pointer'}}>Fazer novo teste</button>
          </>
        );
      case 'idle':
      default:
        return (
          <>
            <Title>Ferramenta de Análise Vocal</Title>
            <Instructions>Pressione o botão para iniciar uma gravação de 5 segundos.</Instructions>
            <RecordButton onClick={handleStartRecording}>Gravar</RecordButton>
          </>
        );
    }
  };

  return (
    <>
      <Head>
        <title>Ferramenta de Análise | angel.ia</title>
      </Head>
      <PageContainer>
        <ToolCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </ToolCard>
        <BackLink href="/">
          Voltar para a página inicial
        </BackLink>
      </PageContainer>
    </>
  );
};

// ESSA LINHA É A SOLUÇÃO
export default Ferramenta;