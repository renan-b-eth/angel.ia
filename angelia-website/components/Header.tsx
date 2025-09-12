// components/Header.tsx
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 2rem;
  background-color: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
`;

// O ESTILO DO LOGO AGORA SERÁ APLICADO DIRETAMENTE AO LINK
const StyledHomeLink = styled(Link)`
  font-family: 'Sora', sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  color: #64FFDA;
  cursor: pointer;
  text-decoration: none; /* Garante que não haja sublinhado */
`;


const Nav = styled.nav`
  a {
    margin-left: 1.5rem;
    color: #CCD6F6;
    transition: color 0.3s;
    font-family: 'Inter', sans-serif;
    text-decoration: none; /* Para remover o sublinhado padrão dos links */
    &:hover { color: #64FFDA; }

    @media (max-width: 768px) {
      margin-left: 1rem;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      {/* Usamos o StyledHomeLink diretamente */}
      <StyledHomeLink href="/">
        angel.ia
      </StyledHomeLink>

      <Nav>
        {/* Mantendo a sintaxe padrão dos Links aqui */}
        <Link href="/#problema">O Problema</Link>
        <Link href="/#solucao">A Solução</Link>
        <Link href="/#beneficios">Benefícios</Link>
        <Link href="/#equipe">Equipe</Link>
        <Link href="/#como-funciona">Como Funciona</Link>
        <Link href="/#perguntas">FAQ</Link>
        <Link href="/#contato">Contato</Link>
        <Link href="/ferramenta">Ferramenta IA</Link>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;