import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <span className="text-white font-poppins font-bold text-2xl">
                Educa<span className="text-secondary">Mais</span>Minas
              </span>
            </div>
            <p className="text-neutral-300 mb-6">
              Transformando carreiras através da educação de qualidade desde 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-secondary transition" aria-label="Facebook">
                <FaFacebookF className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-secondary transition" aria-label="Instagram">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-secondary transition" aria-label="LinkedIn">
                <FaLinkedinIn className="text-xl" />
              </a>
              <a href="#" className="text-white hover:text-secondary transition" aria-label="YouTube">
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-6">Cursos</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-neutral-300 hover:text-white transition">MBA e Especialização</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition">Pós-Graduação</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition">Cursos Livres</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition">Cursos In Company</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition">Cursos EAD</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-6">Institucional</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-neutral-300 hover:text-white transition">Sobre Nós</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition">Docentes</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition">Parcerias</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition">Trabalhe Conosco</a></li>
              <li><a href="#" className="text-neutral-300 hover:text-white transition">Termos de Uso</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-6">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-secondary" />
                <span className="text-neutral-300">Av. Afonso Pena, 1500, Belo Horizonte - MG</span>
              </li>
              <li className="flex items-start">
                <FaPhoneAlt className="mt-1 mr-3 text-secondary" />
                <span className="text-neutral-300">(31) 3333-4444</span>
              </li>
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 text-secondary" />
                <span className="text-neutral-300">contato@educamaisminas.com.br</span>
              </li>
              <li className="flex items-start">
                <FaClock className="mt-1 mr-3 text-secondary" />
                <span className="text-neutral-300">Segunda a Sexta: 8h às 22h<br/>Sábado: 8h às 14h</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-neutral-700 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} EducaMaisMinas. Todos os direitos reservados.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-neutral-400 text-sm hover:text-white transition">Política de Privacidade</a>
            <a href="#" className="text-neutral-400 text-sm hover:text-white transition">Termos de Uso</a>
            <a href="#" className="text-neutral-400 text-sm hover:text-white transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
