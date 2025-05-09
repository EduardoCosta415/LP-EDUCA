import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";

export default function MatriculaSorte() {
  return (
    <>
      <Header />

      <main className=" from-indigo-50 via-white to-indigo-300 py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* Exibindo o PDF com a imagem e sem fundo amarelo */}
          <section className="border-l-8 border-slate-300 p-6 rounded-lg shadow-lg flex flex-col items-center gap-6">
            <div className="md:w-full flex items-center gap-4"> {/* flex para alinhar o texto e a imagem */}

              {/* Imagem com tamanho fixo */}
              <img
                src="/advantages/trevo2.png" // Substitua pelo caminho da sua imagem
                alt="Matrícula da Sorte"
                className="w-[80px] h-[80px] object-contain rounded-lg shadow-md"
              />

              {/* Texto "Matrícula da Sorte" ao lado da imagem */}
              <span className="text-2xl font-bold text-indigo-900">Matrícula da Sorte</span>
            </div>

            {/* PDF maior */}
            <div className="w-full h-[85vh] border border-indigo-100 rounded-lg overflow-hidden">
              <iframe
                src="/footer/regulamento.pdf"
                width="100%"
                height="100%"
                title="Regulamentação Matrícula da Sorte"
              ></iframe>
            </div>

            <Link href="/">
              <a className="inline-block mt-4 bg-indigo-700 text-white px-6 py-2 rounded-full hover:bg-indigo-800 transition">
                Voltar à Página Inicial
              </a>
            </Link>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
