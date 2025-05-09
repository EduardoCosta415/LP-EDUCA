import { useState, useEffect } from "react";
import { Link } from "wouter";
import Modal from "./Modal"; // Import do modal

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (name: string, phone: string) => {
    console.log("Formulário enviado:", name, phone);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Header fixo no topo */}
      <header className={`bg-white sticky top-0 z-50 ${isScrolled ? "shadow-md" : ""}`}>
        <div className="max-w-full mx-auto py-2 px-4 flex justify-between items-center">

          {/* Logo do lado esquerdo */}
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

          {/* Menu de navegação central - Desktop */}
          <div className="hidden md:flex flex-wrap items-center gap-4 lg:gap-6 xl:gap-8 pl-2 max-w-full">
          <a href="#cursos" className="font-poppins font-medium text-neutral-800 hover:text-primary transition flex items-center gap-1">
  <span>ÁREAS</span>
  <img src="advantages/plus.png" alt="Mais" className="h-4 w-4" />
  <span>VALORIZADAS</span>
</a>  <a href="#planos" className="font-poppins font-medium text-neutral-800 hover:text-primary transition">
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

          {/* Botões à direita com espaçamento entre si */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 pl-2">
          <a
  href="/matriculasorte"
  target="_blank"
  rel="noopener noreferrer"
  className="font-poppins text-white bg-green-600 font-extrabold px-2 py-2 rounded-md hover:bg-green-700 transition inline-flex items-center gap-2 flex-shrink-0"
>
<span className="truncate">MATRÍCULA DA SORTE</span>
  <img
    src="/advantages/trevo14.png"
    alt="Trevo da Sorte"
    className="w-[25px] h-[25px] object-contain"
  />
</a>

            <button
              onClick={() => setIsModalOpen(true)}
              className="font-poppins bg-primary text-white px-8 py-2 rounded-md hover:bg-primary/90 transition inline-flex items-center gap-8 font-extrabold"
            >
              MATRICULE-SE
            </button>
          </div>

          {/* Botão hamburguer - Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-800"
              aria-label="Menu"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>

        {/* Menu Mobile - visível apenas no mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-200 p-4">
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
            
              <a href="#consultores" className="font-poppins bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-center" onClick={() => setIsMenuOpen(false)}>
                Matrícula da Sorte
              </a>
              <a href="#contato" className="font-poppins bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition text-center" onClick={() => setIsMenuOpen(false)}>
                Fale Conosco
              </a>
            </div>
          </div>
        )}

        {/* Modal de matrícula */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </header>

      {/* Espaço para empurrar o conteúdo abaixo do header sticky */}
      <div className="h-[02px]" />
    </>
  );
}
