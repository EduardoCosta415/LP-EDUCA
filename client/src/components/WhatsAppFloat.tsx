import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5531999999999?text=Olá!%20Gostaria%20de%20mais%20informações"
      className="fixed bottom-5 right-5 z-50 bg-[#28a745] rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-[#28a745]/90 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contato pelo WhatsApp"
    >
      <FaWhatsapp className="text-white text-3xl" />
    </a>
  );
}
