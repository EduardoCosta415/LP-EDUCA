// Importa hooks do React
//import { useState, useEffect, useRef } from "react";
// Ícones de navegação (setas)
//import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// Framer Motion para animações
//import { motion, AnimatePresence } from "framer-motion";
// Dados dos slides
//import { advantagesData } from "@/data/advantagesData";

// Componente principal do carrossel
import { advantagesData } from "@/data/advantagesData";

export default function AdvantagesGrid() {
  return (
    <section className="py-16 bg-slate-200">
      <div id="vantagens" className="container mx-auto px-4">
        <h2 className="font-poppins font-extrabold text-4xl text-center text-[#1C1B3A] mb-4">
          Por que iniciar sua pós aqui na EDUCA+?
        </h2>

        <p className="text-center mb-12 max-w-2xl mx-auto text-[#1C1B3A] text-xl font-normal">
          É a chance de mudar de vida com quem acredita em você
        </p>

        <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {advantagesData.map((item, index) => (
            <div
              key={index}
              className="bg-blue p-6 rounded-xl shadow-md text-center hover:shadow-lg transition"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 shadow-lg border border-primary/20 bg-primary/10">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-poppins font-extrabold text-lg mb-2 text-[#1C1B3A]">
                {item.title}
              </h3>
              <p className="text-neutral-900 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}