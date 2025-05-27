import { advantagesData } from "@/data/advantagesData";
import React from 'react';

export default function AdvantagesGrid() {
  return (
    <section className="py-12 bg-slate-200">
      <div id="vantagens" className="container mx-auto px-4">
        <h2 className="font-poppins font-extrabold text-4xl text-center text-[#1C1B3A] mb-4">
          Por que iniciar sua pós aqui na EDUCA+?
        </h2>

        <p className="text-center mb-12 max-w-2xl mx-auto text-[#1C1B3A] text-xl font-normal">
          É a chance de mudar de vida com quem acredita em você
        </p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 items-stretch">
          {advantagesData.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center text-center h-full"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden mb-6 shadow-lg border border-primary/20 bg-primary/10">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-poppins font-extrabold text-lg mb-2 text-[#1C1B3A]">
                {item.title}
              </h3>
              <p className="text-neutral-900 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
