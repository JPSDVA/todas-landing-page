import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatStrip from '@/components/StatStrip';
import Manifesto from '@/components/Manifesto';
import AthleteMosaic from '@/components/AthleteMosaic';
import EmailCTA from '@/components/EmailCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <StatStrip />
      <Manifesto />
      <AthleteMosaic />
      <EmailCTA />
      <Footer />
    </main>
  );
}
