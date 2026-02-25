import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        const elements = footerRef.current.querySelector('.footer-content').children;

        gsap.fromTo(elements,
            { y: 40, opacity: 0, filter: "blur(5px)" },
            {
                y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.15, ease: "power3.out",
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 95%",
                }
            }
        );
    }, []);

    return (
        <footer ref={footerRef} className="bg-gray-950 text-white py-20 text-center px-4 relative overflow-hidden">
            {/* Subtle star field bg effect */}
            <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at center, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="footer-content max-w-xl mx-auto relative z-10 flex flex-col items-center">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="h-px w-10 bg-white/20" />
                    <span className="text-yellow-500 text-sm drop-shadow-sm">✦</span>
                    <div className="h-px w-10 bg-white/20" />
                </div>

                <h2 className="text-4xl sm:text-5xl font-serif text-yellow-500 mb-4 transition-transform duration-700 hover:scale-105">
                    Fahad &amp; Fabeeha
                </h2>
                <p className="font-cormorant text-gray-300 text-xl md:text-2xl mb-2 italic">
                    Thank you for being part of our journey.
                </p>
                <p className="font-cormorant text-gray-500 text-lg mb-10 tracking-wide">
                    March 26, 2026 · Chittagong, Bangladesh
                </p>

                <div className="flex items-center justify-center gap-3 mb-10 w-full max-w-[200px]">
                    <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                    <span className="text-yellow-600/70 text-xs">✦</span>
                    <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                </div>

                <p className="text-[10px] md:text-xs font-light text-gray-600 tracking-[0.2em] uppercase">
                    &copy; {new Date().getFullYear()} Fahad &amp; Fabeeha Wedding
                </p>
            </div>
        </footer>
    );
};

export default Footer;
