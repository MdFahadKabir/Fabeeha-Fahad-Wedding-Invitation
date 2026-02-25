import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const sectionRef = useRef(null);
    const timerRef = useRef(null);
    const labelRef = useRef(null);

    useEffect(() => {
        const targetDate = new Date("March 26, 2026 20:00:00").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) { clearInterval(interval); return; }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        const tl = gsap.timeline({
            scrollTrigger: { trigger: sectionRef.current, start: "top 85%" }
        });

        tl.fromTo(labelRef.current,
            { opacity: 0, y: 20, filter: "blur(4px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }
        ).fromTo(timerRef.current.children,
            { opacity: 0, scale: 0.8, y: 30, transformPerspective: 400, rotationX: 15 },
            { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 1.2, stagger: 0.1, ease: "back.out(1.4)" },
            "-=0.6"
        );

        // Subtle bg parallax
        gsap.to(".countdown-bg", {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });

        return () => clearInterval(interval);
    }, []);

    const TimeItem = ({ value, label }) => (
        <div className="flex flex-col items-center px-3 sm:px-6 md:px-10 select-none relative z-10">
            <span className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif text-gray-900 leading-none tabular-nums drop-shadow-sm">
                {value.toString().padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-gray-500 mt-3 font-semibold md:mt-4">
                {label}
            </span>
        </div>
    );

    const Sep = () => (
        <span className="text-2xl sm:text-4xl font-serif text-yellow-500/60 -mt-6 sm:-mt-8 hidden sm:block select-none relative z-10">
            :
        </span>
    );

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-cream-50 border-y border-gray-200/50 overflow-hidden relative flex flex-col items-center">
            {/* Background texture layers */}
            <div className="absolute inset-0 bg-white/40 z-0" />
            <div
                className="countdown-bg absolute -inset-[20%] opacity-[0.04] bg-center bg-repeat pointer-events-none z-0"
                style={{ backgroundImage: 'radial-gradient(circle at center, #000 1px, transparent 1px)', backgroundSize: '16px 16px' }}
            />

            <p ref={labelRef} className="relative z-10 text-xs uppercase tracking-[0.25em] text-center text-gray-600 mb-12 md:mb-16 font-medium">
                Counting Down To The Big Day
            </p>
            <div ref={timerRef} className="flex flex-wrap justify-center items-center relative z-10">
                <TimeItem value={timeLeft.days} label="Days" />
                <Sep />
                <TimeItem value={timeLeft.hours} label="Hours" />
                <Sep />
                <TimeItem value={timeLeft.minutes} label="Mins" />
                <Sep />
                <TimeItem value={timeLeft.seconds} label="Secs" />
            </div>
        </section>
    );
};

export default Countdown;
