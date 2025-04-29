import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { advantagesData } from "@/data/advantagesData";

export default function AdvantagesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % advantagesData.length);
    }, 5000);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const handleNext = () => {
    stopAutoplay();
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % advantagesData.length);
    startAutoplay();
  };

  const handlePrev = () => {
    stopAutoplay();
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + advantagesData.length) % advantagesData.length);
    startAutoplay();
  };

  const visibleItems = () => {
    // For larger screens show more items
    const items = [];
    const totalItems = advantagesData.length;
    
    // Previous item (or last if we're at the beginning)
    const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
    // Next item (or first if we're at the end)
    const nextIndex = (currentIndex + 1) % totalItems;
    
    items.push({
      ...advantagesData[prevIndex],
      position: "left",
      index: prevIndex
    });
    
    items.push({
      ...advantagesData[currentIndex],
      position: "center",
      index: currentIndex
    });
    
    items.push({
      ...advantagesData[nextIndex],
      position: "right",
      index: nextIndex
    });
    
    return items;
  };

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        scale: 0.8,
      };
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 10,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? 300 : -300,
        opacity: 0,
        scale: 0.8,
      };
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-3xl text-center text-neutral-800 mb-2">
          Por que escolher uma pós-graduação?
        </h2>
        <p className="text-neutral-500 text-center mb-12 max-w-3xl mx-auto">
          Descubra como a especialização pode elevar sua carreira e abrir novas oportunidades profissionais
        </p>

        <div className="relative">
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-4xl px-12">
              <div className="overflow-hidden flex items-center justify-center h-72">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  {visibleItems().map((item) => (
                    <motion.div
                      key={item.index}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate={item.position === "center" ? "center" : { opacity: 0.75, scale: 0.9, zIndex: 0 }}
                      exit="exit"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className={`carousel-item absolute min-w-[280px] bg-white p-6 rounded-lg shadow-md text-center ${
                        item.position === "center" ? "z-10" : "z-0"
                      }`}
                      style={{
                        left: item.position === "left" ? "5%" : item.position === "right" ? "65%" : "35%",
                      }}
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className={`fas ${item.icon} text-primary text-2xl`}></i>
                      </div>
                      <h3 className="font-poppins font-semibold text-xl mb-2">{item.title}</h3>
                      <p className="text-neutral-500">{item.description}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-neutral-100 transition z-20"
                aria-label="Previous advantage"
              >
                <FaChevronLeft className="text-primary" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-neutral-100 transition z-20"
                aria-label="Next advantage"
              >
                <FaChevronRight className="text-primary" />
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {advantagesData.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-primary" : "bg-neutral-300"
                }`}
                onClick={() => {
                  stopAutoplay();
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                  startAutoplay();
                }}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
