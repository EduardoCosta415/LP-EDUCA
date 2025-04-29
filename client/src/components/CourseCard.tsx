import { useState } from 'react';
import StarRating from './StarRating';
import { FaWhatsapp } from 'react-icons/fa';

interface CourseCardProps {
  image: string;
  title: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
}

export default function CourseCard({ image, title, category, description, rating, reviews }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="course-card bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        <div 
          className={`absolute inset-0 bg-primary/90 p-4 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-white text-center">
            {description}
          </p>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-poppins font-semibold text-xl mb-1">{title}</h3>
        <p className="text-neutral-500 text-sm mb-2">{category}</p>
        <div className="flex items-center mb-3">
          <StarRating rating={rating} />
          <span className="ml-2 text-sm text-neutral-500">{rating.toFixed(1)} ({reviews} avaliações)</span>
        </div>
        <a 
          href={`https://wa.me/553199999999?text=Olá! Gostaria de saber mais sobre o curso de ${title}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center gap-2 w-full bg-green-500 text-white font-medium py-2 px-4 rounded-md hover:bg-green-600 transition justify-center"
        >
          <FaWhatsapp /> Saber mais
        </a>
      </div>
    </div>
  );
}
