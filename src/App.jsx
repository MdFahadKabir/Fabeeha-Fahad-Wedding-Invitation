import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css'
import Hero from './components/Hero';
import Invite from './components/Invite';
import Countdown from './components/Countdown';
import InvitationMessage from './components/InvitationMessage';
import Events from './components/Events';
import Venue from './components/Venue';
import Footer from './components/Footer';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only init Lenis after loading finishes for smooth performance
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />} 

      {/*  ${loading ? 'h-screen overflow-hidden' : ''} */}
      
      <main 
      className={`antialiased font-cormorant text-gray-900 bg-cream-50 selection:bg-gold-500 selection:text-white ${loading ? 'h-screen overflow-hidden' : ''}`}
      >
        <Hero />
        <Invite />
        <Countdown />
        <InvitationMessage />
        <Events />
        {/* <Venue /> */}
        <Footer />
      </main>
    </>
  );
}

export default App;
