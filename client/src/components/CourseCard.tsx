import { useState } from 'react';
import StarRating from './StarRating';
import { FaWhatsapp } from 'react-icons/fa';
import Modal from './Modal';

interface CourseCardProps {
  image: string;
  title: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
}

export default function CourseCard({
  image,
  title,
  category,
  description
 
}: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const whatsappNumber = '553193450978';

  // Função para enviar dados para a API e abrir o WhatsApp
  const handleSubmit = async (name: string, phone: string) => {
    try {
      const apiResponse = await fetch("http://192.168.4.82:3000/meta/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          course: title,
          type: "curso"
        }),
      });

      if (!apiResponse.ok) throw new Error("Erro ao enviar dados para API");

      const message = `Olá! Meu nome é ${name} e gostaria de saber mais sobre o curso de ${title}.`;
      const encodedMessage = encodeURIComponent(message);
      const cleanNumber = whatsappNumber.replace(/\D/g, '');
      const formattedNumber = cleanNumber.startsWith('55') ? cleanNumber : `55${cleanNumber}`;
      window.location.href = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    } catch (error) {
      console.error('Erro:', error);
      window.location.href = `https://wa.me/${whatsappNumber}`;
    }
  };

  return (
    <div
      className="course-card bg-white overflow-clip transition hover:shadow-lg rounded-md mx-1.5 my-3 md:mx-2 md:my-3 w-[calc(100%-12px)] lg:w-5/6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-row md:flex-col items-stretch">
        {/* Imagem com sobreposição */}
        <div className="relative w-1/2 md:w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-28 md:h-40 object-cover"
          />
          <div
            className={`absolute inset-0 bg-[#1C1B3A] bg-opacity-50 p-2 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-white text-sm md:text-base text-center">{description}</p>
          </div>

          {/* Categoria no canto inferior esquerdo */}
          <span className="md:hidden absolute bottom-1.5 left-1.5 bg-primary text-white text-xs font-semibold px-1.5 py-0.5 rounded">
            Pós EAD
          </span>
        </div>

        {/* Conteúdo do card */}
        <div className="w-1/2 md:w-full p-3 md:p-4 flex flex-col justify-between gap-2">
          {/* Título do curso aumentado */}
          <div>
       <h3 className="font-poppins font-semibold text-xl xs:text-lg leading-snug mb-2 text-center">
              {title}
            </h3>
          </div>

          {/* Botão "Saber mais" */}
          <button
  onClick={() => setIsModalOpen(true)}
  className="inline-flex items-center gap-2 bg-[#212148] text-white font-medium py-2 pl-2 rounded-md transition justify-center text-base w-40 md:w-40 self-center"
>
  <FaWhatsapp className="text-white text-sm" />
  <span>Saber mais</span>
</button>
        </div>
      </div>

      {/* Modal de contato */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        planName={title}
        apiUrl="https://www.polofaculdades.com.br/meta/send"
      />
    </div>
  );
}
