import { useState, useRef, useEffect } from "react";
import { newsData } from "@/data/newsData";
import { motion } from "framer-motion";

export default function NewsCarousel() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(newsData.length / 3);
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
    return newsData.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-3xl text-center text-neutral-800 mb-2">
          Novidades e Eventos
        </h2>
        <p className="text-neutral-500 text-center mb-12 max-w-3xl mx-auto">
          Fique por dentro das últimas atualizações e eventos do mundo acadêmico
        </p>
        
        <div className="relative">
          <div className="flex flex-wrap justify-center gap-6">
            <motion.div 
              className="flex flex-wrap justify-center gap-6 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={currentPage}
            >
              {getCurrentItems().map((item, index) => (
                <div 
                  key={index} 
                  className="carousel-item w-full md:w-[350px] bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex items-center mb-3">
                      <span className={`${item.type === 'event' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'} text-xs font-semibold px-3 py-1 rounded-full`}>
                        {item.type === 'event' ? 'Evento' : 'Novidade'}
                      </span>
                      <span className="text-sm text-neutral-500 ml-3">{item.date}</span>
                    </div>
                    <h3 className="font-poppins font-semibold text-xl mb-2">{item.title}</h3>
                    <p className="text-neutral-600 mb-4">{item.description}</p>
                    <a href="#" className="text-primary font-medium hover:underline">Saiba mais →</a>
                  </div>
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
