import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#1C1B3A] text-neutral-300 py-8 px-4 text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna 1 - Logo + Políticas (mais à esquerda) */}
        <div className="flex flex-col items-start">
          <img src="Logo/rosinha.png" alt="Logo" className="w-32 mb-4" />
          <ul className="space-y-1">
            <li>
              <a href="/cookies" target="_blank"className="hover:text-white transition">Política de Cookies</a>
            </li>
            <li>
              <a href="/privacidade" target="_blank" className="hover:text-white transition">Política de Privacidade</a>
            </li>
            <li>
              <a href="/matriculasorte" target="_blank" className="hover:text-white transition">Regulamento Matrícula da Sorte</a>
            </li>
          </ul>
        </div>

        {/* Coluna 2 - Imagens com links (QR code e outro selo) */}
        <div className="flex flex-col items-start space-y-2">
  <p className="font-semibold text-white">CADASTRO NO SISTEMA E-MEC</p>
  <div className="flex gap-40">
    <a href="https://emec.mec.gov.br" target="_blank" rel="noopener noreferrer">
      <img src="footer/qrcode.jpeg" alt="QR Code" className="w-28 h-28" />
    </a>
    <a href="https://www.reclameaqui.com.br/" target="_blank" rel="noopener noreferrer">
      <img src="/segunda-imagem.png" alt="Reclame Aqui" className="w-24 h-24" />
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