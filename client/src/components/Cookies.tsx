import React from "react";
import { Link } from "wouter";

interface PoliticaDeCookiesModalProps {
  onClose: () => void;
}

export default function PoliticaDeCookiesModal({ onClose }: PoliticaDeCookiesModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
      <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-xl relative">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
          aria-label="Fechar"
        >
          ×
        </button>

        {/* Conteúdo do modal */}
        <section className="w-full bg-gray-800 text-white rounded-t-lg">
          <div className="w-full h-56 flex items-center justify-center bg-gray-900 rounded-t-lg">
            <img
              src="/Logo/rosinha.png"
              alt="Política de Cookies"
              className="max-h-44 object-contain"
            />
          </div>
          <div className="p-6 text-center">
            <h1 className="text-4xl font-bold">Política de Cookies</h1>
            <p className="text-lg mt-4">
              Esta Política de Cookies explica como a Educa Mais Minas EaD utiliza cookies e tecnologias similares em seu site para melhorar sua experiência de navegação.
            </p>
          </div>
        </section>

        <main className="p-8 space-y-12 text-neutral-800">
          <section className="bg-gray-100 p-6 rounded-lg shadow-inner space-y-6 text-justify">
            <div>
              <h2 className="text-2xl font-semibold mb-2">1. O que são Cookies?</h2>
              <p>
                Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site...
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">2. Como Utilizamos os Cookies</h2>
              <p>
                Utilizamos cookies para entender como os visitantes interagem com o nosso site...
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">3. Tipos de Cookies Utilizados</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essenciais:</strong> Necessários para o funcionamento do site.</li>
                <li><strong>Desempenho:</strong> Coletam informações sobre como os visitantes usam o site.</li>
                <li><strong>Funcionalidade:</strong> Permitem lembrar de escolhas feitas por você.</li>
                <li><strong>Publicidade:</strong> Utilizados para anúncios mais relevantes.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">4. Gerenciamento de Cookies</h2>
              <p>
                Você pode configurar seu navegador para recusar todos ou alguns cookies...
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">5. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta Política periodicamente...
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">6. Contato</h2>
              <p>
                Caso tenha dúvidas, entre em contato pelos canais de atendimento do site.
              </p>
            </div>

            <p className="text-sm text-neutral-600 mt-4">
              Última atualização: 31/07/2023.
            </p>
          </section>

          <div className="text-center">
            <Link href="/">
              <a className="inline-block mt-4 bg-indigo-700 text-white px-6 py-2 rounded-full hover:bg-indigo-800 transition">
                Voltar à Página Inicial
              </a>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
