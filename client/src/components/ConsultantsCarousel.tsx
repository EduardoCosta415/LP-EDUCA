import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { consultantsData } from "@/data/consultantsData";
import { FaWhatsapp } from 'react-icons/fa';

type Consultant = {
  image: string;
  name: string;
  role: string;
  specialization: string;
  phone: string;
};

export default function ConsultantsCarousel() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(consultantsData.length / 3);
  const itemsPerPage = 3;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 7000);
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

  const handlePageChange = (pageIndex: number) => {
    stopAutoplay();
    setCurrentPage(pageIndex);
    startAutoplay();
  };

  // Get current page items
  const getCurrentItems = () => {
    const startIndex = currentPage * itemsPerPage;
    return consultantsData.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-3xl text-center text-neutral-800 mb-2">
          Nossos Consultores
        </h2>
        <p className="text-neutral-500 text-center mb-12 max-w-3xl mx-auto">
          Conheça nossa equipe de profissionais especializados que vão te auxiliar na sua jornada acadêmica
        </p>
        
        <div className="relative">
          <div className="flex flex-wrap justify-center gap-6">
            <motion.div 
              className="flex flex-wrap justify-center gap-6 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={currentPage}
            >
              {getCurrentItems().map((consultant: Consultant, index: number) => (
                <div 
                  key={index} 
                  className="consultant-card w-full md:w-[300px] bg-white rounded-lg shadow-md overflow-hidden text-center p-5"
                >
                  <div className="mb-5 mx-auto">
                    <img 
                      src={consultant.image} 
                      alt={consultant.name} 
                      className="w-40 h-40 object-cover rounded-full mx-auto border-4 border-primary/20"
                    />
                  </div>
                  <h3 className="font-poppins font-semibold text-xl mb-1">{consultant.name}</h3>
                  <p className="text-neutral-600 mb-2">{consultant.role}</p>
                  <div className="text-neutral-600 mb-4">{consultant.specialization}</div>
                  <a 
                    href={`https://wa.me/55${consultant.phone}?text=Olá, ${consultant.name}! Gostaria de saber mais sobre os cursos de pós-graduação.`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600 transition"
                  >
                    <FaWhatsapp /> Falar com {consultant.name.split(' ')[0]}
                  </a>
                </div>
              ))}
            </motion.div>
          </div>
          
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`w-8 h-1 rounded-full ${
                  currentPage === index ? "bg-primary" : "bg-neutral-300"
                }`}
                onClick={() => handlePageChange(index)}
                aria-label={`Page ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
