import React, { useState } from "react";
import PoliticaDePrivacidadeModal from "@/pages/PoliticaDePrivacidadeModal"; // ajuste o caminho conform
import PoliticaDeCookiesModal from "./Cookies";
import MatriculaSorteModal from "@/pages/matriculasorte";
export default function Footer() {
  const [showPoliticaModal, setShowPoliticaModal] = useState(false);
  const [showCookiesModal, setShowCookiesModal] = useState(false);
  const [showMatriculaModal, setShowMatriculaModal] = useState(false);

  const hideenModalPolitic = () => { setShowPoliticaModal(!showPoliticaModal) }
  const hideenModalCookie = () => { setShowCookiesModal(!showCookiesModal) }
  const hideenModalMatricula = () => { setShowMatriculaModal(!showMatriculaModal) }

  return (
    <footer className="bg-[#1C1B3A] text-neutral-300 py-8 px-4 text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna 1 - Logo + Políticas (mais à esquerda) */}
        <div className="flex flex-col items-start">
          <img src="Logo/rosinha.png" alt="Logo" className="w-32 mb-4" />
          <ul className="space-y-1">
            <li>
              <button
                className="hover:text-white transition text-neutral-300/80"
                onClick={() => setShowCookiesModal(!showCookiesModal)}
              >Política de Cookies</button>
            </li>
            <li>
              <button
                onClick={() => setShowPoliticaModal(!showPoliticaModal)}
                className="hover:text-white transition text-neutral-300/80"
              >
                Política de Privacidade
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowMatriculaModal(!showMatriculaModal)}
                className="hover:text-white transition text-neutral-300/80"
              >
                Regulamento Matrícula da Sorte
              </button>
            </li>
          </ul>
        </div>
        {
          showPoliticaModal ? (
            <>
              <PoliticaDePrivacidadeModal onClose={hideenModalPolitic} /> {/*  Politica de privacidade */}
            </>
          ) : showCookiesModal ? (
            <>
              <PoliticaDeCookiesModal onClose={hideenModalCookie} /> {/* Politica de cookies */}
            </>
          ) : showMatriculaModal ? (
            <>
              <MatriculaSorteModal onClose={hideenModalMatricula} />
            </>
          ) : null
        }
        {/* Coluna 2 - Imagens com links (QR code e outro selo) */}
        <div className="flex flex-col items-center space-y-2 w-full">
          <p className="font-semibold text-white text-center">CADASTRO NO SISTEMA E-MEC</p>
          <div className="flex w-full justify-center items-center">
            <a href="https://emec.mec.gov.br/emec/consulta-cadastro/detalhes-ies/d96957f455f6405d14c6542552b0f6eb/MzIzMg==" target="_blank" rel="noopener noreferrer">
              <img src="footer/qrcode.jpeg" alt="QR Code" className="w-28 h-28" />
            </a>
          </div>
        </div>

        {/* Coluna 3 - Endereço e CNPJ */}
        <div className="flex flex-col justify-end">
          <p>
            Rua Luiz Rodrigues dos Santos, nº 44, sala 204, Bairro Todos os Santos<br />
            Coronel Fabriciano - Minas Gerais<br />
            CEP: 35170-061
          </p>
          <p className="mt-2">
            Educa Mais Minas LTDA<br />
            CNPJ: 46.713.585/0001-98
          </p>
        </div>
      </div>

      <div className="mt-8 text-center text-neutral-500 text-xs">
        © {new Date().getFullYear()} EducaMaisMinas. Todos os direitos reservados.
      </div>
    </footer>
  );
}