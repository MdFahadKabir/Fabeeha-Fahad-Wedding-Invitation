import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    title: "Mehedi",
    date: "March 24",
    time: "8:00 PM",
    venueName: "Shopping Bag Super Shop",
    image:
      "https://ik.imagekit.io/li2ecyhwr/Whisk_3b14742ed7a787e94b1494991c173b84eg.png",
    link: "https://www.google.com/maps/place/Shopping+Bag+Super+Shop,+281+Chatteshwari+Rd,+Chittagong+4000/@22.3490265,91.8251388,21z/data=!4m6!3m5!1s0x30acd898ecf862e7:0x421935b4cf5c6b34!8m2!3d22.3490641!4d91.8253104!16s%2Fg%2F11yrzt3z4y?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    title: "Wedding",
    date: "March 26",
    time: "8:00 PM",
    venueName: "Chowdhury Convention Hall",
    image:
      "https://ik.imagekit.io/li2ecyhwr/Whisk_44fde0a0522480e97af439c32e342b9ddr.png",
    link: "https://www.google.com/maps/place/Chowdhury+Convention+Hall/@22.3446869,91.7882717,17z/data=!3m1!4b1!4m6!3m5!1s0x30acd950cbff88a1:0x7ef419f531be795c!8m2!3d22.344682!4d91.7908466!16s%2Fg%2F11p_2flp51?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D",
  },
  // {
  //     title: "Reception",
  //     date: "March 27",
  //     time: "7:30 PM",
  //     venueName: "The Golden Spoon",
  //     image: "https://ik.imagekit.io/li2ecyhwr/Whisk_61baa0e4446502a949a49b0554d00c84dr.png",
  //     link: "https://www.google.com/maps/place/The+Golden+Spoon/@22.3622965,91.8065191,17z/data=!3m1!4b1!4m6!3m5!1s0x30acd9f11d63fcf9:0xe01b79f35a39a3e3!8m2!3d22.3622916!4d91.809094!16s%2Fg%2F11tcl51pwl?entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D"
  // }
];

const Events = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 40, opacity: 0, filter: "blur(6px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      },
    );

    itemsRef.current.forEach((item) => {
      if (!item) return;

      const imageContainer = item.querySelector(".event-img-container");
      const imageInner = item.querySelector(".event-img-inner");
      const textContent = item.querySelector(".event-text");

      // Image Parallax
      gsap.to(imageInner, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: imageContainer,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Ghost Number Parallax
      const ghostNumber = item.querySelector(".event-number");
      if (ghostNumber) {
        gsap.to(ghostNumber, {
          yPercent: -60,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Container and text reveal
      gsap.fromTo(
        imageContainer,
        {
          opacity: 0,
          scale: 0.95,
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        },
        {
          opacity: 1,
          scale: 1,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: { trigger: item, start: "top 85%" },
        },
      );

      gsap.fromTo(
        textContent.children,
        { y: 30, opacity: 0, filter: "blur(4px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%" },
        },
      );
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-32 px-4 sm:px-6 bg-cream-50 overflow-hidden"
    >
      <h2
        ref={titleRef}
        className="text-xs sm:text-sm uppercase tracking-[0.3em] text-center mb-16 md:mb-24 opacity-60 font-medium"
      >
        The Celebration
      </h2>

      <div className="max-w-6xl mx-auto space-y-24 md:space-y-40">
        {events.map((event, index) => (
          <div
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className={`flex flex-col gap-10 md:gap-16 md:flex-row md:items-center ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
          >
            {/* Image */}
            <div className="event-img-container w-full md:w-3/5 h-[80vh] md:h-[95vh] overflow-hidden relative md:grayscale hover:md:grayscale-0 transition-all duration-700 ease-out group rounded-sm shadow-sm hover:shadow-xl">
              <div
                className="event-img-inner absolute -top-[15%] left-0 w-full h-[130%] bg-cover bg-center transition-transform duration-[2s] ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${event.image})` }}
              />
            </div>

            {/* Text */}
            <div className="event-text w-full md:w-2/5 text-center md:text-left relative z-10">
              {/* Ghost number */}
              <span className="event-number  text-[12rem] font-serif text-yellow-600/40 absolute -top-16 -left-12 z-0 leading-none select-none pointer-events-none drop-shadow-sm transition-transform duration-700 group-hover:-translate-y-4 group-hover:scale-110 user-select-none">
                0{index + 1}
              </span>
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-4 relative z-20 text-gray-900 group-hover:text-yellow-700 transition-colors duration-500">
                {event.title}
              </h3>
              <div className="h-px w-12 bg-gray-900 mb-6 mx-auto md:mx-0 group-hover:w-24 group-hover:bg-yellow-700 transition-all duration-500 relative z-20" />
              <p className="text-lg sm:text-xl font-cormorant italic text-gray-600 mb-2 font-medium relative z-20">
                {event.date} — {event.time}
              </p>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-semibold relative z-20">
                {event.venueName}
              </p>
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] border-b border-gray-900 pb-1 hover:text-yellow-600 hover:border-yellow-600 transition-colors duration-500 font-medium relative z-20"
              >
                Map Direction{" "}
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
