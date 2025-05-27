import React from "react";
import { Link } from "wouter";

interface PoliticaDePrivacidadeModalProps {
  onClose: () => void;
}

export default function PoliticaDePrivacidadeModal({ onClose }: PoliticaDePrivacidadeModalProps) {
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
              alt="Política de Privacidade"
              className="max-h-44 object-contain"
            />
          </div>
          <div className="p-6 text-center">
            <h1 className="text-4xl font-bold">Política de Privacidade</h1>
            <p className="text-lg mt-4">
              Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais.
            </p>
          </div>
        </section>

        {/* Conteúdo principal */}
        <main className="p-8 space-y-12 text-neutral-800">
          <section className="bg-gray-100 p-6 rounded-lg shadow-inner space-y-6 text-justify">
            <div>
              <h2 className="text-2xl font-semibold mb-2">1. Coleta de Informações</h2>
              <p>
                Coletamos informações que você nos fornece diretamente, como ao preencher formulários, se inscrever em nossos serviços ou entrar em contato conosco.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">2. Uso das Informações</h2>
              <p>
                Utilizamos suas informações para fornecer nossos serviços, personalizar sua experiência, melhorar nosso site e nos comunicar com você.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">3. Compartilhamento de Dados</h2>
              <p>
                Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para cumprir obrigações legais ou mediante seu consentimento.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">4. Segurança das Informações</h2>
              <p>
                Adotamos medidas técnicas e organizacionais para proteger suas informações contra acesso não autorizado, perda ou destruição.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">5. Seus Direitos</h2>
              <p>
                Você tem o direito de acessar, corrigir ou excluir seus dados pessoais. Para isso, entre em contato conosco pelos canais disponíveis.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">6. Alterações nesta Política</h2>
              <p>
                Podemos atualizar esta política periodicamente. As alterações serão publicadas em nosso site com data de atualização revisada.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">7. Contato</h2>
              <p>
                Para dúvidas sobre esta Política de Privacidade, entre em contato com nossa equipe de suporte.
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
