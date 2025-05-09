import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Modal from './Modal';
export default function WhatsAppFloat() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const whatsappNumber = '553193450978';
  
  const handleSubmit = (name: string, phone: string) => {
    try {
      // Formata a mensagem incluindo o nome do usuário
      const message = `Olá! Meu nome é ${name} e gostaria de mais informações sobre os cursos.`;
      const encodedMessage = encodeURIComponent(message);
      
      // Redireciona para o WhatsApp com a mensagem
      window.location.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    } catch (error) {
      console.error("Erro ao redirecionar para WhatsApp:", error);
      // Fallback simples se algo der errado
      window.location.href = `https://wa.me/${whatsappNumber}`;
    }
  };
  
  return (
    <>
      {/* Importante: Mantém a classe "fixed" para fixar na tela */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-5 right-5 z-50 bg-[#28a745] rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-[#28a745]/90 transition-colors"
        aria-label="Contato pelo WhatsApp"
      >
        <FaWhatsapp className="text-white text-3xl" />
      </button>
      
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}