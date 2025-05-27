import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import React from 'react'; // Importa os ícones de estrela para o sistema de classificação

interface StarRatingProps {
  rating: number;  // Nota de avaliação fornecida como número (por exemplo, 4.5)
  maxStars?: number;  // Número máximo de estrelas (padrão é 5)
}

export default function StarRating({ rating, maxStars = 5 }: StarRatingProps) {
  const stars = [];  // Array para armazenar as estrelas que serão renderizadas
  const fullStars = Math.floor(rating);  // Número de estrelas completas (parte inteira da classificação)
  const hasHalfStar = rating % 1 >= 0.5;  // Verifica se há meio estrela (se o valor decimal for maior ou igual a 0.5)
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);  // Número de estrelas vazias, levando em conta as estrelas cheias e meia estrela

  // Adiciona as estrelas completas ao array
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`star-full-${i}`} className="text-[#ffc107]" />); // Adiciona a estrela cheia
  }

  // Se necessário, adiciona uma estrela meia cheia
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="star-half" className="text-[#ffc107]" />); // Adiciona a meia estrela
  }

  // Adiciona as estrelas vazias ao array
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`star-empty-${i}`} className="text-[#ffc107]" />); // Adiciona a estrela vazia
  }

  return <div className="flex">{stars}</div>; // Retorna as estrelas como elementos de um contêiner flexível
}
