import React from "react";

interface MatriculaSorteModalProps {
  onClose: () => void;
}

export default function MatriculaSorteModal({ onClose }: MatriculaSorteModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-xl shadow-2xl relative p-8 overflow-hidden">
        
        {/* Botão de Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-gray-600 hover:text-black text-2xl font-bold"
          aria-label="Fechar"
        >
          &times;
        </button>

        {/* Cabeçalho com imagem e título */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src="/advantages/trevo2.png"
            alt="Matrícula da Sorte"
            className="w-[70px] h-[70px] object-contain rounded-lg shadow"
          />
          <h2 className="text-3xl font-bold text-indigo-900">Matrícula da Sorte</h2>
        </div>

        {/* Iframe do regulamento - tamanho maior */}
        <div className="w-full h-[75vh] border border-indigo-100 rounded-lg overflow-hidden">
          <iframe
            src="/footer/regulamento.pdf"
            width="100%"
            height="100%"
            title="Regulamento Matrícula da Sorte"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
