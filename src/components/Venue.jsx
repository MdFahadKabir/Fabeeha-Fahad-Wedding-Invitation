import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const venues = [
    {
        name: "Fabeeha's Residence",
        event: "Mehedi",
        address: "123 Green Lane, Dhaka",
        link: "https://maps.google.com"
    },
    {
        name: "Grand Convention",
        event: "Wedding",
        address: "456 Royal Avenue, Gulshan",
        link: "https://maps.google.com"
    },
    {
        name: "Royal Banquet",
        event: "Reception",
        address: "789 Celebration Road, Banani",
        link: "https://maps.google.com"
    }
];

const Venue = () => {
    const sectionRef = useRef(null);
    const listRef = useRef([]);

    useEffect(() => {
        gsap.fromTo(".venue-title",
            { y: 30, opacity: 0, filter: "blur(4px)" },
            {
                y: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out",
                scrollTrigger: { trigger: sectionRef.current, start: "top 85%" }
            }
        );

        listRef.current.forEach((item, index) => {
            if (!item) return;

            const content = item.children;
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                }
            });

            tl.fromTo(item,
                { opacity: 0, y: 25 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            ).fromTo(content,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
                "-=0.4"
            );
        });
    }, []);

    return (
        <section ref={sectionRef} className="py-32 bg-white px-6">
            <div className="max-w-5xl mx-auto">
                <h2 className="venue-title text-xs uppercase tracking-[0.3em] text-gray-500 mb-16 border-b border-gray-200 pb-6 font-medium">
                    Location Details
                </h2>

                <div className="grid gap-px bg-gray-200 border border-gray-200">
                    {venues.map((venue, index) => (
                        <div
                            key={index}
                            ref={el => listRef.current[index] = el}
                            className="bg-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-center hover:bg-cream-50 transition-colors duration-500 group"
                        >
                            <div className="text-center md:text-left mb-6 md:mb-0">
                                <span className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2 block">{venue.event}</span>
                                <h3 className="text-3xl font-serif text-gray-900 group-hover:translate-x-2 transition-transform duration-300">{venue.name}</h3>
                            </div>

                            <div className="text-center md:text-right">
                                <p className="font-cormorant text-xl text-gray-500 mb-4">{venue.address}</p>
                                <a
                                    href={venue.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-xs uppercase tracking-[0.2em] border-b border-gray-900 pb-1 hover:text-gold-600 hover:border-gold-600 transition-colors"
                                >
                                    Map Direction
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Venue;
