import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import wedBg from "../assets/wed2.jpg";

gsap.registerPlugin(ScrollTrigger);

const BISMILLAH = "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ";
const QURAN_ARABIC =
  "رَبَّنَا هَبۡ لَنَا مِنۡ أَزۡوَٰجِنَا وَذُرِّيَّـٰتِنَا قُرَّةَ أَعۡيُنٍ";

const InvitationMessage = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const imgRef = useRef(null);
  const bismillahRef = useRef(null);
  const quranRef = useRef(null);
  const rightRef = useRef(null);
  const dividerRef = useRef(null);
  const parentsRef = useRef(null);
  const bridgeRef = useRef(null);
  const brideRef = useRef(null);
  const withRef = useRef(null);
  const groomRef = useRef(null);
  const parentLineRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    // Image breathe & Parallax
    gsap.fromTo(
      imgRef.current,
      { scale: 1.15, opacity: 0, filter: "blur(4px)" },
      {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 2.2,
        ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      },
    );

    // Continuous slow scale
    // gsap.to(imgRef.current, {
    //     scale: 1.05, duration: 15, repeat: -1, yoyo: true, ease: 'sine.inOut'
    // });

    // Vertical scroll parallax
    gsap.to(imgRef.current, {
      yPercent: 25,
      ease: "none",
      scrollTrigger: {
        trigger: leftRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Left text stagger
    const leftTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
    leftTl
      .fromTo(
        bismillahRef.current,
        { y: -30, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        },
      )
      .fromTo(
        quranRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.6",
      );

    // Right slide in
    gsap.fromTo(
      rightRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 68%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Right stagger
    const rightTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 58%",
        toggleActions: "play none none reverse",
      },
    });
    rightTl
      .fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          transformOrigin: "center",
        },
      )
      .fromTo(
        parentsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.3",
      )
      .fromTo(
        bridgeRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.2",
      )
      .fromTo(
        [brideRef.current, withRef.current, groomRef.current],
        { y: 40, opacity: 0, filter: "blur(4px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.22,
          ease: "power3.out",
        },
        "-=0.2",
      )
      .fromTo(
        parentLineRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        "-=0.4",
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full flex flex-col md:flex-row justify-between items-stretch overflow-hidden bg-cream-50"
      dir="ltr"
    >
      {/* ── LEFT: Image + Quranic content ── */}
      <div
        ref={leftRef}
        className="relative w-full md:w-1/2 flex flex-col items-center justify-center overflow-hidden min-h-[55vh] md:min-h-screen"
      >
        <img
          ref={imgRef}
          src={wedBg}
          alt="Wedding"
          className="absolute -top-[15%] left-0 w-full h-[130%] object-fit object-center"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center px-6 py-12 md:py-16">
          {/* Bismillah */}
          <div ref={bismillahRef} className="mb-5" dir="rtl">
            <p
              className="text-3xl sm:text-4xl md:text-5xl leading-loose text-white drop-shadow-lg"
              style={{ fontFamily: '"Amiri", serif' }}
            >
              {BISMILLAH}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-white/50" />
            <span className="text-yellow-300 text-sm">✦</span>
            <div className="h-px w-8 bg-white/50" />
          </div>

          <div ref={quranRef}>
            <p
              className="text-lg sm:text-xl md:text-2xl leading-loose text-white/90 mb-4 drop-shadow"
              dir="rtl"
              style={{ fontFamily: '"Amiri", serif' }}
            >
              {QURAN_ARABIC}
            </p>
            <p className="text-sm md:text-base italic text-white/80 leading-relaxed">
              "Grant unto us wives and offspring
              <br />
              who will be the coolness of our eyes."
            </p>
            <p className="text-xs text-white/60 mt-2 tracking-widest uppercase">
              (Quran 25:74)
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Invitation Text ── */}
      <div
        ref={rightRef}
        className="w-full md:w-1/2 flex flex-col items-center justify-center text-center px-6 sm:px-10 py-14 md:py-20 bg-white"
      >
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400 mb-7">
          Wedding Invitation
        </p>

        <div
          ref={dividerRef}
          className="flex items-center justify-center gap-2 mb-7 w-full max-w-xs"
        >
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-yellow-600 text-base">❧</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        <div ref={parentsRef} className="mb-5">
          <p className="text-base md:text-lg font-cormorant text-gray-700 leading-relaxed">
            <strong>Md. Nasirul Islam</strong> &amp;{" "}
            <strong>Mrs. Shahida Begum</strong>
          </p>
        </div>

        <div ref={bridgeRef} className="mb-7">
          <p className="text-sm italic text-gray-500 leading-relaxed">
            request the pleasure of your company
            <br />
            at the Nikkah &amp; Wedding ceremony
            <br />
            of their beloved daughter
          </p>
        </div>

        <p
          ref={brideRef}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-linear-to-br from-yellow-500 to-yellow-700 mb-1 leading-tight drop-shadow-sm"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Fabeeha Islam
        </p>

        <p
          ref={withRef}
          className="text-base md:text-lg italic text-gray-400 my-3"
        >
          with
        </p>

        <p
          ref={groomRef}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-linear-to-br from-yellow-500 to-yellow-700 mb-7 leading-tight drop-shadow-sm"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          Md Fahad Kabir
        </p>

        <p
          ref={parentLineRef}
          className="text-xs sm:text-sm text-gray-500 italic mb-7"
        >
          Son of Md. Humayun Kabir &amp; Mrs. Ferdousi Begum
        </p>

        <div className="flex items-center justify-center gap-2 w-full max-w-xs">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-yellow-600 text-sm">✦</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>
      </div>
    </section>
  );
};

export default InvitationMessage;
