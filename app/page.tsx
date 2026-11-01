import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import CinematicScroll from '@/components/providers/CinematicScroll';
import ScrollProgress from '@/components/ui/ScrollProgress';
import AudioFeedback from '@/components/ui/AudioFeedback';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollFilm from '@/components/film/ScrollFilm';
import HomeHero from '@/components/home/HomeHero';
import MarqueeTicker from '@/components/sections/MarqueeTicker';
import AboutSection from '@/components/sections/AboutSection';
import DivisionsChapters from '@/components/home/DivisionsChapters';
import IndustriesSection from '@/components/sections/IndustriesSection';
import ProjectsChapters from '@/components/home/ProjectsChapters';
import LeadershipSection from '@/components/sections/LeadershipSection';
import SustainabilitySection from '@/components/sections/SustainabilitySection';
import ClientsSection from '@/components/sections/ClientsSection';
import ContactSection from '@/components/sections/ContactSection';
import { MagneticCursor } from '@/components/canvas/LazyCanvases';

export default function Home() {
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <MagneticCursor />
      <AudioFeedback />

      {/* One film behind the whole page: each section (data-shot) scrubs its own real clip with the scroll */}
      <ScrollFilm />

      <Navbar />
      <main className="force-dark film-copy relative z-10">
        <HomeHero />
        <MarqueeTicker />
        <AboutSection />
        <DivisionsChapters />
        <IndustriesSection />
        <ProjectsChapters />
        <LeadershipSection />
        <SustainabilitySection />
        <ClientsSection />
        <ContactSection />
      </main>
      <Footer />
      <CinematicScroll />

      {/* Film grain over the whole frame, DOM included */}
      <div className="cinematic-grain" aria-hidden />
    </SmoothScrollProvider>
  );
}
