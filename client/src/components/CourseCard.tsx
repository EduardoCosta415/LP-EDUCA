import { useState } from 'react';               // Importa o hook de estado do React
import StarRating from './StarRating';          // Importa o componente de estrelas de avaliação
import { FaWhatsapp } from 'react-icons/fa';    // Ícone do WhatsApp
import Modal from './Modal';                    // Componente de modal para coleta de dados

// Tipagem das propriedades esperadas pelo componente CourseCard
interface CourseCardProps {
  image: string;       // URL da imagem do curso
  title: string;       // Título do curso
  category: string;    // Categoria do curso
  description: string; // Descrição do curso (exibida ao passar o mouse)
  rating: number;      // Nota média do curso (ex: 4.5)
  reviews: number;     // Número de avaliações recebidas
}

// Componente funcional que renderiza um card de curso
export default function CourseCard({
  image,
  title,
  category,
  description,
  rating,
  reviews,
}: CourseCardProps) {
  // Estado para verificar se o mouse está sobre o card (hover)
  const [isHovered, setIsHovered] = useState(false);
  // Estado para controlar se o modal está aberto ou não
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Número de WhatsApp fixo para redirecionamento
  const whatsappNumber = '553193450978';

  // Função chamada quando o usuário envia o formulário do modal
  const handleSubmit = (name: string, phone: string) => {
    try {
      // Cria uma mensagem personalizada com o nome do usuário e nome do curso
      const message = `Olá! Meu nome é ${name} e gostaria de saber mais sobre o curso de ${title}.`;
      // Codifica a mensagem para ser usada em uma URL
      const encodedMessage = encodeURIComponent(message);
      // Remove quaisquer caracteres não numéricos do número
      const cleanNumber = whatsappNumber.replace(/\D/g, '');
      // Garante que o número esteja formatado com o código do Brasil (55)
      const formattedNumber = cleanNumber.startsWith('55')
        ? cleanNumber
        : `55${cleanNumber}`;
      // Monta a URL final do WhatsApp com número e mensagem
      const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
      // Redireciona o usuário para o WhatsApp
      window.location.href = whatsappUrl;
    } catch (error) {
      // Caso ocorra erro, redireciona para o número fixo como fallback
      console.error('Erro ao redirecionar para WhatsApp:', error);
      window.location.href = `https://wa.me/${whatsappNumber}`;
    }
  };

  return (
    <div
      className="course-card bg-white overflow-clip transition hover:shadow-lg rounded-md "
      onMouseEnter={() => setIsHovered(true)}    // Ativa o estado de hover ao passar o mouse
      onMouseLeave={() => setIsHovered(false)}  // Desativa ao sair com o mouse
    >
      <div className="relative">
        {/* Imagem do curso com altura fixa e largura reduzida */}
        <img src={image} alt={title} className="w-full h-48 object-cover mx-auto" /> {/* Alterei a largura para w-3/4 e centralizei com mx-auto */}

        {/* Overlay com a descrição visível apenas no hover */}
        <div
          className={`absolute inset-0 bg-[#1C1B3A] bg-opacity-50 p-4 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-white text-center">{description}</p>
        </div>
      </div>

      {/* Conteúdo textual do card */}
      <div className="p-5">
        {/* Título do curso */}
        <h3 className="font-poppins font-semibold text-xl mb-1">{title}</h3>
        
        {/* Categoria do curso */}
        <p className="text-gray-700 text-sm mb-2">{category}</p>

        {/* Botão que abre o modal para preencher nome e telefone */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 w-full bg-[#212148] text-white font-medium py-2 px-4 rounded-md transition justify-center"
        >
          <FaWhatsapp className="text-white" />
          <span>Saber mais</span>
        </button>
      </div>

      {/* Modal para capturar os dados do usuário antes de redirecionar para o WhatsApp */}
      <Modal
        isOpen={isModalOpen}             // Controla se o modal está visível
        onClose={() => setIsModalOpen(false)} // Função para fechar o modal
        onSubmit={handleSubmit}          // Função que trata o envio dos dados
        apiUrl="https://webhook.site/#!/view/6b686b40-e1c8-4ce8-b22e-a178d79019a4/b188eef9-6419-4100-be08-78fb65a7bb87/1" // <-- Link Da API
      />
    </div>
  );
}
