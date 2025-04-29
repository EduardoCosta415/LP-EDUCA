import { Link } from "wouter";
import StarRating from "./StarRating";

export default function HeroSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-neutral-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-neutral-800 mb-4">
              Transforme seu futuro com educação de qualidade
            </h1>
            <p className="text-neutral-500 text-lg mb-8">
              Cursos de pós-graduação reconhecidos pelo MEC com mentoria exclusiva e metodologia prática para impulsionar sua carreira.
            </p>
            <div className="flex items-center mb-8">
              <div className="flex">
                <StarRating rating={5} />
              </div>
              <span className="ml-2 text-neutral-800">Avaliação 4.8/5 por nossos alunos</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#cursos" 
                className="bg-primary text-white font-poppins font-medium px-6 py-3 rounded-md hover:bg-primary/90 transition text-center"
              >
                Conhecer Cursos
              </a>
              <a 
                href="#planos" 
                className="bg-white border border-primary text-primary font-poppins font-medium px-6 py-3 rounded-md hover:bg-neutral-200 transition text-center"
              >
                Ver Planos
              </a>
            </div>
          </div>
          <div className="md:w-5/12">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Estudantes profissionais em sala de aula" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
