import { useState, useRef, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { testimonialData } from "@/data/testimonialData";
import { benefitsData } from "@/data/benefitsData";
import StarRating from "./StarRating";
import { motion, AnimatePresence } from "framer-motion";

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentTestimonial((prev) => (prev + 1) % testimonialData.length);
    }, 6000);
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

  const handlePrev = () => {
    stopAutoplay();
    setDirection(-1);
    setCurrentTestimonial((prev) => (prev - 1 + testimonialData.length) % testimonialData.length);
    startAutoplay();
  };

  const handleNext = () => {
    stopAutoplay();
    setDirection(1);
    setCurrentTestimonial((prev) => (prev + 1) % testimonialData.length);
    startAutoplay();
  };

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
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Testimonials Column */}
          <div className="lg:w-1/2">
            <h2 className="font-poppins font-bold text-3xl text-neutral-800 mb-8">
              O que nossos alunos dizem
            </h2>
            
            <div className="relative overflow-hidden">
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
                  className="testimonial-item bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonialData[currentTestimonial].image} 
                      alt={testimonialData[currentTestimonial].name} 
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-poppins font-semibold text-lg">{testimonialData[currentTestimonial].name}</h3>
                      <p className="text-neutral-500 text-sm">{testimonialData[currentTestimonial].course}</p>
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
              
              <div className="flex justify-between mt-6">
                <button 
                  className="bg-white p-3 rounded-full shadow-md hover:bg-neutral-100 transition"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                >
                  <FaArrowLeft className="text-primary" />
                </button>
                
                <div className="flex gap-2 items-center">
                  {testimonialData.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full ${
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
                  className="bg-white p-3 rounded-full shadow-md hover:bg-neutral-100 transition"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                >
                  <FaArrowRight className="text-primary" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Benefits Column */}
          <div className="lg:w-1/2">
            <h2 className="font-poppins font-bold text-3xl text-neutral-800 mb-8">
              Por que escolher a EducaMaisMinas
            </h2>
            
            <div className="space-y-6">
              {benefitsData.map((benefit, index) => (
                <div key={index} className="flex">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <i className={`fas ${benefit.icon} text-primary text-xl`}></i>
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-neutral-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
