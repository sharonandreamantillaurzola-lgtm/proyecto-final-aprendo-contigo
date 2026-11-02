import { useStylesheet } from '../hooks/useStylesheet.js';
import Header from '../components/landing/Header.jsx';
import Hero from '../components/landing/Hero.jsx';
import Beneficios from '../components/landing/Beneficios.jsx';
import Nosotros from '../components/landing/Nosotros.jsx';
import AreasAcademicas from '../components/landing/AreasAcademicas.jsx';
import Catalogo from '../components/landing/Catalogo.jsx';
import Testimonios from '../components/landing/Testimonios.jsx';
import AsistenteIA from '../components/landing/AsistenteIA.jsx';
import Contacto from '../components/landing/Contacto.jsx';
import LoginCta from '../components/landing/LoginCta.jsx';
import Footer from '../components/landing/Footer.jsx';

export default function LandingPage() {
  useStylesheet('/styles/style.css');

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Beneficios />
        <Nosotros />
        <AreasAcademicas />
        <Catalogo />
        <Testimonios />
        <AsistenteIA />
        <Contacto />
        <LoginCta />
        <Footer />
      </main>
    </>
  );
}
