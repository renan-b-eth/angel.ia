import React from 'react';
import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';

// --- Estilização ---
const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 2rem;
  background-color: #0A192F;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #CCD6F6;
  text-align: center;
  margin-bottom: 5rem;
`;

const TimelineContainer = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1100px;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 3rem;
  }
`;

const StepCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 30%;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #112240;
  border: 2px solid #64FFDA;
  color: #64FFDA;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const StepTitle = styled.h3`
  font-size: 1.5rem;
  color: #FFF;
  margin-bottom: 1rem;
`;

const StepDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #8892B0;
`;

// --- Animações ---
const timelineVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const HowItWorksSection: React.FC = () => {
  return (
    <SectionContainer>
      <Title>Simples, rápido e inteligente.</Title>
      <TimelineContainer
        variants={timelineVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <StepCard variants={stepVariants}>
          <StepNumber>1</StepNumber>
          <StepTitle>Gravação</StepTitle>
          <StepDescription>O paciente grava uma pequena amostra de voz (30s) através da nossa plataforma segura.</StepDescription>
        </StepCard>
        <StepCard variants={stepVariants}>
          <StepNumber>2</StepNumber>
          <StepTitle>Análise IA</StepTitle>
          <StepDescription>Nosso algoritmo patenteado processa centenas de biomarcadores vocais em segundos.</StepDescription>
        </StepCard>
        <StepCard variants={stepVariants}>
          <StepNumber>3</StepNumber>
          <StepTitle>Relatório</StepTitle>
          <StepDescription>Um relatório preliminar de risco é gerado para o profissional de saúde avaliar.</StepDescription>
        </StepCard>
      </TimelineContainer>
    </SectionContainer>
  );
};

export default HowItWorksSection;