import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import Modal from './Modal';

export default function WhatsAppFloat() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const whatsappNumber = '553193450978';
  
  const handleApiSubmit = async (name: string, phone: string) => {
    try {
      // Primeiro envia os dados para a API
      const apiResponse = await fetch("http://www.polofaculdades.com.br:3000/meta/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: name,
          phone: phone.replace(/\D/g, ''),
          promotion_name: "Contato via WhatsApp Float", // Descrição específica para este contato
          promotion_quantity: 1,
          promotion_price: 0,
          utm: new URLSearchParams(window.location.search).get('utm_source') || "",
          graduation: "", // Pode ser preenchido pelo modal
          type: "contato_geral" // Identificador para contatos gerais
        }),
      });

      if (!apiResponse.ok) throw new Error("Erro ao enviar dados para API");

      // Depois redireciona para o WhatsApp
      const message = `Olá! Meu nome é ${name} e gostaria de mais informações sobre os cursos.`;
      const encodedMessage = encodeURIComponent(message);
      window.location.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    } catch (error) {
      console.error("Erro:", error);
      // Fallback para WhatsApp sem mensagem pré-definida
      window.location.href = `https://wa.me/${whatsappNumber}`;
    }
  };
  
  return (
    <>
      <div className="fixed bottom-5 right-5 z-50 group">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#28a745] border-8 border-[#1e7e34] rounded-full w-20 h-20 group-hover:w-[300px] transition-all duration-300 ease-in-out flex items-center justify-normal pl-4 overflow-hidden shadow-lg"
          aria-label="Contato pelo WhatsApp"
        >
          <FaWhatsapp className="text-white text-3xl flex-shrink-0" />
          <span className="ml-4 text-white text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Fale com um de nossos consultores
          </span>
        </button>
      </div>
      
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planName="Contato via WhatsApp" // Descrição que aparecerá na API
        apiUrl="https://www.polofaculdades.com.br/meta/send"
        onSubmit={handleApiSubmit}
      />
    </>
  );
}