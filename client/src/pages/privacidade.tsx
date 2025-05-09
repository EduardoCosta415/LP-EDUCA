import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";

export default function PoliticaDePrivacidade() {
  return (
    <>
      <Header />

      {/* Banner no topo com contraste escuro */}
      <section className="w-full bg-gray-800 text-white rounded-lg shadow-md mb-12">
        <div className="w-full h-56 flex items-center justify-center bg-gray-900 rounded-t-lg">
          <img
            src="Logo/rosinha.png"
            alt="Política de Privacidade"
            className="max-h-44 object-contain"
          />
        </div>
        <div className="p-6 text-center">
          <h1 className="text-4xl font-bold">Política de Privacidade</h1>
          <p className="text-lg mt-4">
            A presente Política de Privacidade descreve como a Educa Mais Minas EaD coleta, utiliza, compartilha e protege as informações pessoais dos usuários. Ao acessar e utilizar nossos serviços, você concorda com as práticas descritas nesta política.
          </p>
        </div>
      </section>

      <main className="p-8 space-y-12 max-w-5xl mx-auto text-neutral-800">
        <section className="bg-gray-100 p-6 rounded-lg shadow-inner space-y-6 text-justify">
          <div>
            <h2 className="text-2xl font-semibold mb-2">1. Informações Coletadas</h2>
            <p>
              Coletamos informações pessoais que você nos fornece diretamente, como nome, e-mail, telefone, entre outros, quando você se cadastra em nosso site ou interage com nossos serviços. Também podemos coletar informações automaticamente, como dados de navegação e cookies, para melhorar a sua experiência.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">1.1. Tipos de Informações Coletadas</h3>
            <p className="mb-2">As informações podem incluir, mas não se limitam a:</p>
            <ul className="list-disc pl-6 mb-2">
              <li><strong>Informações de Identificação Pessoal:</strong> Nome, e-mail, telefone, entre outros dados fornecidos diretamente por você.</li>
              <li><strong>Informações de Navegação:</strong> IP, tipo de dispositivo, navegador, páginas acessadas, etc.</li>
              <li><strong>Cookies:</strong> Utilizamos cookies para armazenar informações relacionadas à sua navegação e melhorar sua experiência.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">2. Como Utilizamos as Informações</h2>
            <p>
              Utilizamos as informações coletadas para fornecer e melhorar nossos serviços, personalizar a experiência do usuário, responder a solicitações e realizar comunicações relacionadas aos nossos produtos e serviços. Também podemos usar as informações para fins de marketing e análise.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">3. Compartilhamento de Informações</h2>
            <p>
              A Educa Mais Minas EaD não vende, aluga ou compartilha suas informações pessoais com terceiros, exceto quando necessário para fornecer nossos serviços ou quando exigido por lei. Podemos compartilhar dados com parceiros de confiança que nos ajudam a operar o site, desde que esses parceiros concordem em manter essas informações confidenciais.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">4. Segurança das Informações</h2>
            <p>
              Adotamos medidas de segurança adequadas para proteger suas informações pessoais contra acessos não autorizados, alteração ou destruição. No entanto, nenhum sistema de segurança é 100% seguro, e não podemos garantir a segurança total de suas informações.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">5. Seus Direitos</h2>
            <p>
              Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Se desejar exercer esses direitos ou tiver alguma dúvida sobre como tratamos seus dados, entre em contato conosco através de nossos canais de atendimento.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">6. Alterações nesta Política</h2>
            <p>
              Podemos alterar esta Política de Privacidade a qualquer momento. Quaisquer mudanças serão publicadas nesta página, e a data de atualização será indicada no final deste documento. Recomendamos que você revise periodicamente esta política para se manter informado sobre como protegemos suas informações.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">7. Contato</h2>
            <p>
              Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre como tratamos suas informações pessoais, entre em contato conosco por meio dos canais de atendimento disponíveis em nosso site.
            </p>
          </div>

          <p className="text-sm text-neutral-600 mt-4">Esta Política de Privacidade foi atualizada pela última vez: 31/07/2023.</p>
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