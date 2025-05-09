import { useState, useRef, useEffect } from "react"; // Hooks do React
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Ícones de navegação
import { testimonialData } from "@/data/testimonialData"; // Dados dos depoimentos
import StarRating from "./StarRating"; // Componente de avaliação por estrelas
import { motion, AnimatePresence } from "framer-motion"; // Biblioteca de animação

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Inicia o autoplay
  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentTestimonial((prev) => (prev + 1) % testimonialData.length);
    }, 6000);
  };

  // Para o autoplay
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

  // Navegar para anterior
  const handlePrev = () => {
    stopAutoplay();
    setDirection(-1);
    setCurrentTestimonial((prev) => (prev - 1 + testimonialData.length) % testimonialData.length);
    startAutoplay();
  };

  // Navegar para próximo
  const handleNext = () => {
    stopAutoplay();
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % testimonialData.length);
    startAutoplay();
  };

  // Animações com Framer Motion
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section id="depoimentos" className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">

          {/* Apenas a Coluna de Depoimentos */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <h2 className="font-poppins font-bold text-4xl text-[#1C1B3A] mb-8 text-center">
              Depoimentos que Inspiram
            </h2>

            {/* Moldura estilo iPhone 6 */}
            <div className="relative w-[320px] h-[480px] lg:h-[568px] border-[8px] border-neutral-800 rounded-[48px] bg-white shadow-2xl overflow-hidden">

              {/* Alto-falante superior (detalhe do iPhone) */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-neutral-500 rounded-full z-10" />

              {/* Conteúdo do depoimento com animação */}
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentTestimonial}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="p-6 h-full flex flex-col justify-center gap-4"
                >
                  {/* Dados do depoente */}
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonialData[currentTestimonial].image} 
                      alt={testimonialData[currentTestimonial].name} 
                      className="w-16 h-16 rounded-full object-cover mr-2"
                    />
                    <div>
                      <h3 className="font-poppins font-semibold text-[17px] tracking-tighter">
                        {testimonialData[currentTestimonial].name}
                      </h3>
                      <p className="text-neutral-500 text-sm">
                        {testimonialData[currentTestimonial].course}
                      </p>
                      <div className="mt-1">
                        <StarRating rating={testimonialData[currentTestimonial].rating} />
                      </div>
                    </div>
                  </div>
                  <p className="text-neutral-600 italic">
                    "{testimonialData[currentTestimonial].testimonial}"
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Botões de navegação */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-between px-6 z-10">
                <button 
                  className="bg-white p-2 rounded-full shadow-md hover:bg-neutral-100 transition"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                >
                  <FaArrowLeft className="text-primary" />
                </button>

                {/* Indicadores (pontos) */}
                <div className="flex gap-2 items-center">
                  {testimonialData.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2.5 h-2.5 rounded-full ${
                        currentTestimonial === index ? "bg-primary" : "bg-neutral-300"
                      }`}
                      onClick={() => {
                        stopAutoplay();
                        setDirection(index > currentTestimonial ? 1 : -1);
                        setCurrentTestimonial(index);
                        startAutoplay();
                      }}
                      aria-label={`Go to testimonial ${index + 1}`}
                    ></button>
                  ))}
                </div>

                <button 
                  className="bg-white p-2 rounded-full shadow-md hover:bg-neutral-100 transition"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                >
                  <FaArrowRight className="text-primary" />
                </button>
              </div>

              {/* Botão Home (decoração) */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-16 border-1 border-neutral-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
