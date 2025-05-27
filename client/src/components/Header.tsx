import { useState, useEffect } from "react";
import { Link } from "wouter";
import Modal from "./Modal";
import MatriculaSorteModal from "@/pages/matriculasorte";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMatriculaOpen, setModalMatriculaOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleApiSubmit = async (name: string, phone: string) => {
    try {
      const response = await fetch("https://www.polofaculdades.com.br/meta/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: name,
          phone: phone.replace(/\D/g, ''),
          promotion_name: "Interesse em Matrícula",
          promotion_quantity: 1,
          promotion_price: 0,
          utm: new URLSearchParams(window.location.search).get('utm_source') || "",
          graduation: "",
          type: "matricula"
        })
      });

      if (!response.ok) throw new Error("Erro ao enviar dados");
      
      console.log("Dados enviados com sucesso!");
      setIsModalOpen(false);
      
      // Redirecionamento opcional para WhatsApp
      const whatsappNumber = '553193450978';
      const message = `Olá! Meu nome é ${name} e gostaria de finalizar minha matrícula.`;
      window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const hiddenMatriculaModal = () => setModalMatriculaOpen(!modalMatriculaOpen);

  return (
    <>
      <header className={`bg-white sticky top-0 z-50 ${isScrolled ? "shadow-md" : ""}`}>
        {modalMatriculaOpen && <MatriculaSorteModal onClose={hiddenMatriculaModal} />}
        
        <div className="max-w-full mx-auto py-2 px-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <a>
                <img
                  src="/advantages/Educa+.png"
                  alt="Logo EducaMaisMinas"
                  width={140}
                  height={40}
                  className="object-contain"
                />
              </a>
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden lg:flex flex-wrap items-center gap-4 lg:gap-6 xl:gap-8 pl-2 max-w-full">
            <a href="#cursos" className="font-poppins font-medium text-neutral-800 hover:text-primary transition flex items-center gap-1">
              <span>ÁREAS</span>
              <img src="advantages/plus.png" alt="Mais" className="h-4 w-4" />
              <span>VALORIZADAS</span>
            </a>
            <a href="#planos" className="font-poppins font-medium text-neutral-800 hover:text-primary transition">
              PLANOS
            </a>
            <a
              href="#vantagens"
              className="font-poppins font-medium text-neutral-800 hover:text-primary transition flex items-center gap-2"
            >
              <img src="advantages/plus.png" alt="Ícone Vantagens" className="w-4 h-4" />
              VANTAGENS DA NOSSA PÓS
            </a>
            <a href="#depoimentos" className="font-poppins font-medium text-neutral-800 hover:text-primary transition">
              DEPOIMENTOS
            </a>
          </div>

          {/* Botões Desktop */}
          <div className="hidden lg:flex items-center gap-4 lg:gap-6 xl:gap-8 pl-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="font-poppins bg-primary text-white px-8 py-2 rounded-md hover:bg-primary/90 transition inline-flex items-center gap-8 font-extrabold"
            >
              MATRICULE-SE
            </button>
          </div>

          {/* Menu Mobile */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-800"
              aria-label="Menu"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Menu Mobile Aberto */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-neutral-200 p-4">
            <div className="flex flex-col space-y-3">
              <a href="#cursos" className="font-poppins font-medium text-neutral-800 hover:text-primary transition" onClick={() => setIsMenuOpen(false)}>
                Áreas Mais Valorizadas
              </a>
              <a href="#planos" className="font-poppins font-medium text-neutral-800 hover:text-primary transition" onClick={() => setIsMenuOpen(false)}>
                Planos
              </a>
              <a href="#vantagens" className="font-poppins font-medium text-neutral-800 hover:text-primary transition" onClick={() => setIsMenuOpen(false)}>
                Vantagens da nossa Pós
              </a>
              <a href="#depoimentos" className="font-poppins font-medium text-neutral-800 hover:text-primary transition" onClick={() => setIsMenuOpen(false)}>
                Depoimentos
              </a>
              
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsModalOpen(true);
                }}
                className="font-poppins bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition text-center font-extrabold"
              >
                MATRICULE-SE
              </button>
            </div>
          </div>
        )}

        {/* Modal de Matrícula */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          planName="Matricula"
          apiUrl="https://www.polofaculdades.com.br/meta/send"
          onSubmit={handleApiSubmit}
        />
      </header>

      <div className="h-[2px]" />
    </>
  );
}