import CourseCard from "./CourseCard";
import { courseData } from "@/data/courseData";

export default function CourseSection() {
  return (
    <section id="cursos" className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-3xl text-center text-neutral-800 mb-2">
          Áreas de Interesse
        </h2>
        <p className="text-neutral-500 text-center mb-12 max-w-3xl mx-auto">
          Explore nossos cursos de pós-graduação em diversas áreas do conhecimento
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
