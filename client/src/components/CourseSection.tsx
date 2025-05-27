// Importa o componente visual de card do curso
import CourseCard from "./CourseCard";
// Importa os dados dos cursos (lista de objetos com informações de cada curso)
import { courseData } from "@/data/courseData";

// Componente que exibe a seção com todos os cursos
export default function CourseSection() {
  return (
    <section id="cursos" className=" bg-neutral-100 py-10">
      <div className="mx-auto px-2 max-w-4x1">
        
        {/* Título principal */}
        <h2 className="font-poppins font-extrabold text-4xl text-center text-[#1C1B3A] mb-2 flex items-center justify-center gap-2">
          Áreas
          <img src="advantages/plus.png" alt="Mais" className="w-6 h-6 inline-block" />
          Valorizadas
        </h2>

        {/* Descrição abaixo do título */}
        <p className="text-[#1C1B3A] text-center mb-12 max-w-4xl mx-auto text-2xl font-normal">
          Temos mais de <span className="font-extrabold">4.0000 Cursos</span> de Pós-Graduação e MBA autorizados pelo MEC
        </p>

        {/* Grade de cards responsiva */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center lg:px-6">
          {courseData.map((course, index) => (
            <CourseCard
              key={index}
              image={course.image}
              title={course.title}
              category={course.category}
              description={course.description}
              rating={course.rating}
              reviews={course.reviews}
            />
          ))}
        </div>
      </div>
    </section>
  );
}