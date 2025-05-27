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

        {/* Cabeçalho */}
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
              Esta Política explica como utilizamos cookies e tecnologias similares para melhorar sua experiência.
            </p>
          </div>
        </section>

        {/* Conteúdo principal */}
        <main className="p-8 space-y-12 text-neutral-800">
          <section className="bg-gray-100 p-6 rounded-lg shadow-inner space-y-6 text-justify">
            <div>
              <h2 className="text-2xl font-semibold mb-2">1. O que são Cookies?</h2>
              <p>
                Cookies são pequenos arquivos de texto armazenados em seu dispositivo quando você visita um site. Eles ajudam a lembrar de suas preferências e melhoram sua navegação.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">2. Por que usamos Cookies?</h2>
              <p>
                Utilizamos cookies para oferecer uma melhor experiência, entender como você interage com nosso site e para fins de segurança e desempenho.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">3. Tipos de Cookies que Utilizamos</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essenciais:</strong> Necessários para o funcionamento do site.</li>
                <li><strong>Desempenho:</strong> Coletam dados para melhorar o desempenho do site.</li>
                <li><strong>Funcionais:</strong> Permitem lembrar preferências e escolhas anteriores.</li>
                <li><strong>Publicidade:</strong> Usados para fornecer anúncios relevantes ao usuário.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">4. Como Gerenciar Cookies</h2>
              <p>
                Você pode controlar e excluir cookies através das configurações do seu navegador. Rejeitar cookies pode impactar algumas funcionalidades do site.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">5. Alterações na Política</h2>
              <p>
                Esta política pode ser atualizada periodicamente. Recomendamos que você a revise regularmente.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">6. Contato</h2>
              <p>
                Em caso de dúvidas sobre o uso de cookies, entre em contato conosco pelos nossos canais de atendimento.
              </p>
            </div>

            <p className="text-sm text-neutral-600 mt-4">
              Última atualização: 13/05/2025.
            </p>
          </section>

          {/* Botão voltar */}
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
