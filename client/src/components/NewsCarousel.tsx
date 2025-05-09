import { useState, useRef, useEffect } from "react"; // Importa hooks necessários: useState para estado, useRef para referência ao intervalo, useEffect para controlar o autoplay
import { newsData } from "@/data/newsData"; // Importa os dados das notícias e eventos
import { motion } from "framer-motion"; // Importa framer-motion para animação

export default function NewsCarousel() {
  const [currentPage, setCurrentPage] = useState(0); // Estado para controlar a página atual (inicia com a página 0)
  const totalPages = Math.ceil(newsData.length / 3); // Calcula o total de páginas dividindo os itens por 3 (itens por página)
  const itemsPerPage = 3; // Define o número de itens por página (3 itens)
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Referência para armazenar o identificador do intervalo para autoplay

  // Função que começa o autoplay, trocando a página a cada 7 segundos
  const startAutoplay = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages); // A cada 7 segundos, aumenta o número da página e reinicia ao atingir o final
    }, 7000);
  };

  // Função que para o autoplay, limpando o intervalo
  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Limpa o intervalo se houver um ativo
      intervalRef.current = null; // Define como null após parar
    }
  };

  // Effect que inicia o autoplay quando o componente é montado e para quando é desmontado
  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay(); // Limpa o intervalo quando o componente for desmontado
  }, []); // O array vazio [] garante que esse efeito só será executado uma vez

  // Função que altera a página quando um botão de navegação é clicado
  const handlePageChange = (pageIndex: number) => {
    stopAutoplay(); // Para o autoplay
    setCurrentPage(pageIndex); // Altera para a página clicada
    startAutoplay(); // Reinicia o autoplay
  };

  // Função que retorna os itens da página atual
  const getCurrentItems = () => {
    const startIndex = currentPage * itemsPerPage; // Calcula o índice inicial para a página atual
    return newsData.slice(startIndex, startIndex + itemsPerPage); // Retorna os itens da página atual
  };

  return (
    <section className="py-16 bg-white"> {/* Seção com padding vertical de 64px e fundo branco */}
      <div className="container mx-auto px-4"> {/* Container centralizado com padding horizontal de 16px */}
        <h2 className="font-poppins font-bold text-3xl text-center text-neutral-800 mb-2">
          Novidades e Eventos
        </h2>
        <p className="text-neutral-500 text-center mb-12 max-w-3xl mx-auto">
          Fique por dentro das últimas atualizações e eventos do mundo acadêmico
        </p>

        {/* Div que envolve o carrossel, com posicionamento relativo */}
        <div className="relative">
          <div className="flex flex-wrap justify-center gap-6">
            {/* Animação usando framer-motion para fade-in ao alterar a página */}
            <motion.div 
              className="flex flex-wrap justify-center gap-6 w-full"
              initial={{ opacity: 0 }} // Começa com opacidade 0
              animate={{ opacity: 1 }} // Anima até opacidade 1
              key={currentPage} // Key muda sempre que a página muda, acionando a animação
            >
              {/* Mapeamento dos itens da página atual */}
              {getCurrentItems().map((item, index) => (
                <div 
                  key={index} 
                  className="carousel-item w-full md:w-[350px] bg-white rounded-lg shadow-md overflow-hidden"
                >
                  {/* Imagem do item, com largura total e altura fixa */}
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-48 object-cover" // Faz a imagem cobrir o espaço e manter a proporção
                  />
                  <div className="p-5">
                    <div className="flex items-center mb-3">
                      {/* Label de tipo (Evento ou Novidade), com estilo dinâmico baseado no tipo */}
                      <span className={`${item.type === 'event' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'} text-xs font-semibold px-3 py-1 rounded-full`}>
                        {item.type === 'event' ? 'Evento' : 'Novidade'} {/* Exibe "Evento" ou "Novidade" baseado no tipo */}
                      </span>
                      <span className="text-sm text-neutral-500 ml-3">{item.date}</span> {/* Data do item */}
                    </div>
                    {/* Título da notícia/evento */}
                    <h3 className="font-poppins font-semibold text-xl mb-2">{item.title}</h3>
                    {/* Descrição curta */}
                    <p className="text-neutral-600 mb-4">{item.description}</p>
                    {/* Link para mais informações */}
                    <a href="#" className="text-primary font-medium hover:underline">Saiba mais →</a>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navegação de páginas com pontos circulares */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`w-8 h-1 rounded-full ${
                  currentPage === index ? "bg-primary" : "bg-neutral-300"
                }`} // Botão de navegação, cor de fundo depende da página atual
                onClick={() => handlePageChange(index)} // Alterar para a página clicada
                aria-label={`Page ${index + 1}`} // Acessibilidade: descreve a página ao qual o botão pertence
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}