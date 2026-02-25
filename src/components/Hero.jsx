import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* --------------------------------------------------
   Import BOTH desktop & mobile frames (Vite requires
   static glob paths)
-------------------------------------------------- */

// Desktop
const desktopModules = import.meta.glob("../assets/hero/*.jpg", {
  eager: true,
  import: "default",
});

// Mobile
const mobileModules = import.meta.glob("../assets/mob-hero/*.jpg", {
  eager: true,
  import: "default",
});

// Sort helper
const sortFrames = (modules) =>
  Object.keys(modules)
    .sort((a, b) => {
      const numA = parseInt(a.match(/frame-(\d+)\.jpg$/)[1], 10);
      const numB = parseInt(b.match(/frame-(\d+)\.jpg$/)[1], 10);
      return numA - numB;
    })
    .map((key) => modules[key]);

const desktopUrls = sortFrames(desktopModules);
const mobileUrls = sortFrames(mobileModules);

const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const scrollLabelRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  /* --------------------------------------------------
     Detect screen resize
  -------------------------------------------------- */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* --------------------------------------------------
     Main Animation
  -------------------------------------------------- */
  useEffect(() => {
    // Choose the target sequence based on screen width
    const currentUrls = isMobile && mobileUrls.length > 0 ? mobileUrls : desktopUrls;

    if (currentUrls.length === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const frameCount = currentUrls.length;

    const images = [];
    let heroAnim = { frame: 0 };

    // ✅ Preload all appropriate images
    currentUrls.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      images[i] = img;
    });

    /* ---------- Render ---------- */
    const render = (index) => {
      const img = images[index];
      if (!img) return;

      if (canvas.width !== img.width) {
        canvas.width = img.width;
        canvas.height = img.height;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };

    // Ensure frame 001 shows immediately
    images[0].onload = () => render(0);
    if (images[0].complete) render(0);

    /* ---------- Initial States ---------- */
    gsap.set([subtitleRef.current, titleRef.current], {
      opacity: 0,
      y: 80,
      filter: "blur(10px)",
    });

    gsap.fromTo(
      scrollLabelRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, delay: 1 }
    );

    /* ---------- Master Timeline ---------- */
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Frame animation
    masterTl.to(heroAnim, {
      frame: frameCount - 1,
      ease: "none",
      snap: "frame",
      duration: 3,
      onUpdate: () => {
        render(heroAnim.frame);

        if (heroAnim.frame > 5) {
          gsap.to(scrollLabelRef.current, {
            opacity: 0,
            duration: 0.3,
            overwrite: true,
          });
        }
      },
    });

    // Text reveal AFTER frames finish
    masterTl.to([subtitleRef.current, titleRef.current], {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      stagger: 0.2,
      duration: 1,
      ease: "power2.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [isMobile]); // 🔥 Re-run if device changes

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black"
    >
      {/* Canvas Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* Text */}
      <div className="relative z-10 text-center px-4 w-full">
        <p
          ref={subtitleRef}
          className="text-sm sm:text-sm tracking-[0.3em] uppercase mb-6 opacity-90 text-[#B22222] font-bold"
        >
          Save The Date
        </p>

        <h1
          ref={titleRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] leading-none font-serif tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-[#B22222] via-[#C97B6A] to-[#E8DCC3]"
        >
          Fahad{" "}
          <span className="block sm:inline italic font-light text-linear-to-tl from-[#B22222] via-[#C97B6A] to-[#E8DCC3]">
            &amp;
          </span>{" "}
          Fabeeha
        </h1>
      </div>

      {/* Scroll Label */}
      <div
        ref={scrollLabelRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <p className="text-[10px] uppercase tracking-[0.4em] text-white opacity-70">
          Scroll
        </p>
        <div className="w-px h-8 bg-white/40" />
      </div>
    </section>
  );
};

export default Hero;