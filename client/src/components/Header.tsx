import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`bg-white sticky top-0 z-50 ${isScrolled ? "shadow-md" : ""}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-primary font-poppins font-bold text-2xl">
                Educa<span className="text-secondary">Mais</span>Minas
              </a>
            </Link>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#depoimentos" className="font-poppins font-medium text-neutral-800 hover:text-primary transition">
            Depoimentos
          </a>
          <a href="#cursos" className="font-poppins font-medium text-neutral-800 hover:text-primary transition">
            Cursos
          </a>
          <a href="#planos" className="font-poppins font-medium text-neutral-800 hover:text-primary transition">
            Planos
          </a>
          <a
            href="#contato"
            className="font-poppins bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
          >
            Fale Conosco
          </a>
        </nav>

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

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 p-4">
          <div className="flex flex-col space-y-3">
            <a
              href="#depoimentos"
              className="font-poppins font-medium text-neutral-800 hover:text-primary transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Depoimentos
            </a>
            <a
              href="#cursos"
              className="font-poppins font-medium text-neutral-800 hover:text-primary transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Cursos
            </a>
            <a
              href="#planos"
              className="font-poppins font-medium text-neutral-800 hover:text-primary transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Planos
            </a>
            <a
              href="#contato"
              className="font-poppins bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Fale Conosco
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
