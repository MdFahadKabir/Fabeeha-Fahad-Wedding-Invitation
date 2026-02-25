import React, { useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
    const loaderRef = useRef(null);

    useEffect(() => {
        // The loader needs to stay for about 6 seconds total
        const timer = setTimeout(() => {
            gsap.to(loaderRef.current, {
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut',
                onComplete: onComplete
            });
        }, 5000); // 5s wait + 1s fade out = 6s total

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div ref={loaderRef} className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-cream-50">
            <div className="w-64 h-64 md:w-96 md:h-96">
                <DotLottieReact
                    src="https://lottie.host/c5296fa3-ab23-4947-9a92-d56573d1161f/n67BCZZ8IX.lottie"
                    loop
                    autoplay
                />
            </div>
            <p className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-yellow-600 animate-pulse font-medium text-center">
                Welcome to our dream
            </p>
        </div>
    );
};

export default Loader;
