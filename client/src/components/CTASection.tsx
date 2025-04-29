import { FaWhatsapp } from "react-icons/fa";

export default function CTASection() {
  return (
    <section id="contato" className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-poppins font-bold text-3xl text-white mb-4 max-w-3xl mx-auto">
          Pronto para dar o próximo passo na sua carreira profissional?
        </h2>
        <p className="text-white/80 mb-8 max-w-2xl mx-auto">
          Inscreva-se agora e ganhe acesso gratuito a nossa aula inaugural e material exclusivo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#cursos" 
            className="bg-white text-primary font-poppins font-medium px-8 py-4 rounded-md hover:bg-neutral-100 transition"
          >
            Ver cursos disponíveis
          </a>
          <a 
            href="https://wa.me/5531999999999?text=Olá!%20Gostaria%20de%20mais%20informações%20sobre%20os%20cursos" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-white font-poppins font-medium px-8 py-4 rounded-md hover:bg-secondary/90 transition"
          >
            <FaWhatsapp className="inline mr-2" /> Falar com consultor
          </a>
        </div>
      </div>
    </section>
  );
}
