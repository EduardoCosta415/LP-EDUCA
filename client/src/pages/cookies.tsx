import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";

export default function PoliticaDeCookies() {
  return (
    <>
      <Header />

      {/* Banner no topo com fundo escuro e imagem proporcional */}
      <section className="w-full bg-gray-800 text-white rounded-lg shadow-md mb-12">
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

      <main className="p-8 space-y-12 max-w-5xl mx-auto text-neutral-800">
        <section className="bg-gray-100 p-6 rounded-lg shadow-inner space-y-6 text-justify">
          <div>
            <h2 className="text-2xl font-semibold mb-2">1. O que são Cookies?</h2>
            <p>
              Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de maneira mais eficiente, bem como para fornecer informações aos proprietários do site.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">2. Como Utilizamos os Cookies</h2>
            <p>
              Utilizamos cookies para entender como os visitantes interagem com o nosso site, personalizar conteúdos, oferecer funcionalidades de mídia social e analisar o tráfego.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">3. Tipos de Cookies Utilizados</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento do site.</li>
              <li><strong>Cookies de Desempenho:</strong> Coletam informações sobre como os visitantes usam o site.</li>
              <li><strong>Cookies de Funcionalidade:</strong> Permitem que o site lembre de escolhas feitas por você.</li>
              <li><strong>Cookies de Publicidade:</strong> Utilizados para fornecer anúncios mais relevantes para você.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">4. Gerenciamento de Cookies</h2>
            <p>
              Você pode configurar seu navegador para recusar todos ou alguns cookies, ou para alertá-lo quando os sites configurarem ou acessarem cookies. No entanto, se você desativar ou recusar cookies, algumas partes deste site podem ficar inacessíveis ou não funcionar corretamente.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">5. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta Política de Cookies periodicamente. Quaisquer alterações serão publicadas nesta página com uma nova data de atualização.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">6. Contato</h2>
            <p>
              Caso tenha dúvidas sobre esta Política de Cookies, entre em contato conosco pelos canais de atendimento disponíveis em nosso site.
            </p>
          </div>

          <p className="text-sm text-neutral-600 mt-4">Esta Política de Cookies foi atualizada pela última vez: 31/07/2023.</p>
        </section>

        {/* Botão para voltar */}
        <div className="text-center">
          <Link href="/">
            <a className="inline-block mt-4 bg-indigo-700 text-white px-6 py-2 rounded-full hover:bg-indigo-800 transition">
              Voltar à Página Inicial
            </a>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}