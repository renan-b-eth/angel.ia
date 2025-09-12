// pages/index.tsx

import type { NextPage } from 'next';
import Head from 'next/head';

// Importe TODOS os componentes
//import Header from '../components/Header'; // Adicionado para demonstração no _app.tsx
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import BenefitsSection from '../components/BenefitsSection'; // NOVO
import HowItWorksSection from '../components/HowItWorksSection';
import ScienceSection from '../components/ScienceSection';
import TeamSection from '../components/TeamSection';         // NOVO
import FaqSection from '../components/FaqSection';           // NOVO
import ContactSection from '../components/ContactSection';   // NOVO
import Footer from '../components/Footer';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>angel.ia | O Anjo da Saúde na Sua Voz</title>
        <meta name="description" content="angel.ia: Diagnóstico precoce de doenças neurodegenerativas pela voz com IA." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* O Header será renderizado em _app.tsx, não aqui diretamente */}
      
      <main>
        <HeroSection />
        <ProblemSection/> {/* Adicione IDs para navegação */}
        <SolutionSection /> {/* Adicione IDs para navegação */}
        <BenefitsSection /> {/* Adicione IDs para navegação */}
        <HowItWorksSection /> {/* Adicione IDs para navegação */}
        <ScienceSection />         {/* Adicione IDs para navegação */}
        <TeamSection  />             {/* Adicione IDs para navegação */}
        <FaqSection />           {/* Adicione IDs para navegação */}
        <ContactSection />         {/* Adicione IDs para navegação */}
      </main>
      
      <Footer />
    </>
  );
};

export default Home;