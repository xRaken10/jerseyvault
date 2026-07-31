import Navbar from './components/layout/Navbar';
import HeroEditorial from './components/landing/HeroEditorial';
import ArchiveGrid from './components/landing/ArchiveGrid';
import FooterEditorial from './components/layout/FooterEditorial';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0a0a0a] text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <HeroEditorial />
        <ArchiveGrid />
      </main>
      <FooterEditorial />
    </div>
  );
}
