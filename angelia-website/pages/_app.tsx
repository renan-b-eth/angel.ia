// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header'; // Importe o Header

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header /> {/* O Header agora aparece em todas as páginas */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;