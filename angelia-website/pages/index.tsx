// pages/index.tsx

import type { NextPage } from 'next';
import Head from 'next/head';

// Importe TODOS os componentes
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import HowItWorksSection from '../components/HowItWorksSection'; // NOVO
import ScienceSection from '../components/ScienceSection';     // NOVO
import Footer from '../components/Footer';                     // NOVO

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Angel.ia | O Futuro do Diagnóstico na Sua Voz</title>
        <meta name="description" content="Análise por IA para detecção precoce de doenças." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection /> {/* ADICIONADO */}
        <ScienceSection />    {/* ADICIONADO */}
      </main>
      
      <Footer /> {/* ADICIONADO */}
    </>
  );
};

export default Home;