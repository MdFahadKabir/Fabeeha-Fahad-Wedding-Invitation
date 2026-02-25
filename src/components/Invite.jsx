import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Invite = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const text3Ref = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
            }
        });

        tl.fromTo([text1Ref.current, text2Ref.current, text3Ref.current],
            { opacity: 0, y: 50, filter: "blur(8px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.6, stagger: 0.2, ease: "power3.out" }
        ).fromTo(lineRef.current,
            { scaleY: 0 },
            { scaleY: 1, duration: 1.2, ease: "power3.inOut", transformOrigin: "center" },
            "-=1.4"
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-20 md:py-32 bg-cream-50 flex items-center justify-center px-4 relative overflow-hidden"
        >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle at center, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div ref={contentRef} className="max-w-xl w-full text-center relative z-10">
                <p ref={text1Ref} className="text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-500 mb-8 md:mb-12">
                    The Union
                </p>
                <h2 ref={text2Ref} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-gray-900 mb-8 md:mb-10 block">
                    We invite you to witness the beginning of our forever.
                </h2>
                <div ref={lineRef} className="w-px h-16 md:h-24 bg-yellow-500 mx-auto mb-8 md:mb-10" />
                <p ref={text3Ref} className="text-base md:text-lg font-cormorant text-gray-600 italic">
                    March 26th, 2026 · Chittagong, Bangladesh
                </p>
            </div>
        </section>
    );
};

export default Invite;
