import { useState } from "react"; // Importa o hook 'useState' para controlar estados (como o modal aberto)
import { FaCheck, FaTimes, FaWhatsapp } from "react-icons/fa"; // Ícones prontos do pacote react-icons
import Modal from "./Modal"; // Componente personalizado de modal
import trevo from "/advantages/plus.png"; // Imagem usada como ícone antes do nome dos planos
// Tipagem dos recursos individuais dos planos
interface PlanFeature {
  text: string;
  included: boolean;
}

// Tipagem completa do plano
interface PricingPlan {
  name: string;
  tagline1?: string;
  tagline2?: string;
  tagline3?: string;
  price: string;
  annualPrice: string;
  discount: string;
  customCardClass?: string;
  bgClass: string;
  headerBgClass?: string;
  textClass: string;
  buttonClass: string;
  subscribeButtonClass: string;
  consultButtonClass: string;
  popular?: boolean;
  features: PlanFeature[];
  whatsappText: string;
}
interface ExclusiveConditionProps {
  conditionText: string;
}

const ExclusiveCondition = ({ conditionText }: ExclusiveConditionProps) => {
  return (
    <div className="flex items-center justify-evenly gap-4 mt-3 w-full text-white">
      {/* Imagem SVG */}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-gift-icon lucide-gift">
        <rect x="3" y="8" width="18" height="4" rx="1"/>
        <path d="M12 8v13"/>
        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
      </svg>
      {/* Texto da condição exclusiva */}
      <span className="text-white font-medium">{conditionText}</span>
    </div>
  );
};

export default function PricingPlans() {
  const [modalOpenForPlan, setModalOpenForPlan] = useState(-1);
  const whatsappNumber = "553193450978";

  // 💡 Função que envia os dados para sua API
  const sendDataToAPI = async (name: string, phone: string, planName: string) => {
    try {
      const response = await fetch("https://webhook.site/#!/view/6b686b40-e1c8-4ce8-b22e-a178d79019a4/b188eef9-6419-4100-be08-78fb65a7bb87/1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          plan: planName,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar dados para API");
      }

      console.log("Dados enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  // função handlesubmit funcionando com segurança
  const handleSubmit = async (name: string, phone: string, planIndex: number) => {
    try {
      const plan = plans[planIndex];
      await sendDataToAPI(name, phone, plan.name); // Envia os dados primeiro
      const message = `Olá! Meu nome é ${name} e tenho interesse no plano ${plan.name}.`;
      const encodedMessage = encodeURIComponent(message);
      window.location.href = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    } catch (error) {
      console.error("Erro ao redirecionar para WhatsApp:", error);
      window.location.href = `https://wa.me/${whatsappNumber}`;
    }
  };

  // Planos disponíveis
  const plans: PricingPlan[] = [
    {
      name: "+ESSENCIAL",
      tagline1: "1 PÓS",
      tagline2: "Para quem quer dar o primeiro passo com inteligência e economia",
      tagline3: "Ideal para iniciantes que buscam qualificação com investimento acessível",
      price: "12 x R$ 39,95",
      annualPrice: "NO CARTÃO SEM JUROS",
      discount: "",
      bgClass: "bg-neutral-100",
      textClass: "text-neutral-800",
      buttonClass: "bg-secondary hover:bg-secondary/90",
      subscribeButtonClass: "text-lg font-bold",
      consultButtonClass: "bg-green-600 text-white",
      whatsappText: "Olá!%20Tenho%20interesse%20no%20plano%20Essencial",
      features: [
        { text: "Acesso imediato 1 curso de Pós-Graduação", included: true },
        { text: "Bônus: 1 curso de extensão ou capacitação grátis ", included: true },
        { text: "1 Número do Matrícula da Sorte", included: true },
        { text: "Tutoria Online", included: true },
        { text: "Certificado Digital", included: true },
        { text: "Suporte Especializado", included: true },
      ],
    },
    {
      name: "+EXECUTIVO",
      tagline1: "3 PÓS + 1 GRÁTIS",
      tagline2: "Três especializações para liderar com autoridade em qualquer cenário",
      tagline3: "Feito para profissionais que querem se destacar e comandar grandes projetos.",
      price: "12 x R$29,90 CADA",
      annualPrice: "NO CARTÃO SEM JUROS",
      discount: "",
      bgClass: "bg-primary",
      headerBgClass: "",
      textClass: "",
      buttonClass: "bg-primary hover:bg-primary/90",
      subscribeButtonClass: "",
      consultButtonClass: "bg-green-600 text-white",
      popular: true,
      whatsappText: "Olá!%20Tenho%20interesse%20no%20plano%20Executivo",
      features: [
        { text: "Acesso imediato a 3 cursos de Pós-Graduação", included: true },
        { text: "+1 Pós Grátis", included: true },
        { text: "Bônus de 3 cursos de extensão ou capacitação", included: true },
        { text: "3 Números do Matrícula da Sorte", included: true },
        { text: "Tutoria Online", included: true },
        { text: "Certificado Digital", included: true },
        { text: "Suporte Especializado", included: true },
      ],
    },
    {
      name: "ESTRATÉGICO",
      tagline1: "2 PÓS + 1 GRÁTIS",
      tagline2: "Duas formações, o dobro de oportunidades no mercado",
      tagline3: "Pensado para quem quer ampliar seu leque de atuação com foco e visão",
      price: "12 x R$ 36,95 CADA",
      discount: "",
      annualPrice: "NO CARTÂO SEM JUROS",
      bgClass: "bg-neutral-200",
      textClass: "text-neutral-800",
      buttonClass: "bg-neutral-800 hover:bg-neutral-700",
      subscribeButtonClass: "",
      consultButtonClass: "bg-green-600 text-white",
      whatsappText: "Olá!%20Tenho%20interesse%20no%20plano%20Estratégico",
      features: [
        { text: "Acesso imediato a 2 curos de Pós-Graduação", included: true },
        { text: "+ 1 Pós Grátis", included: true },
        { text: "Bônus de 2 cursos de extensão ou capacitação", included: true },
        { text: "2 Números do Matrícula da Sorte", included: true },
        { text: "Tutoria Online", included: true },
        { text: "Certificado Digital", included: true },
        { text: "Suporte Especializado", included: true },
      ],
    },
    {
      name: "+VISIONÁRIO",
      tagline1: "4 CURSOS OU MAIS.",
      tagline2: "A gente te ajuda a ir além.",
      tagline3: "Um plano sob medida para mentes inquietas, líderes e empreendedores de alto nível.",
      price: "Sob consulta",
      annualPrice: "PERSONALIZADO",
      discount: "CONSULTE O PREÇO",
      bgClass: "bg-gradient-to-br from-rose-400 to-pink-600", // Ajustado para fundo consistente
      headerBgClass: "", // Ajustado para o cabeçalho
      textClass: "",
      buttonClass: "text-white",
      subscribeButtonClass: "text-white",
      consultButtonClass: "bg-green-600 text-white",
      whatsappText: "Olá!%20Tenho%20interesse%20no%20plano%20Visionário",
      features: [
        { text: "Consulte Condições", included: true },
        
      ],
    },
  ];

  // Ordem de exibição personalizada
  const reorderedPlans = [plans[0], plans[2], plans[1], plans[3]];

  return (
    <section id="planos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Título e subtítulo da seção */}
        <h2 className="font-poppins font- text-3xl text-center text-[#1C1B3A] mb-2 font-extrabold">
          Que saber como ter sucesso na sua carreira? Nós temos um plano.
        </h2>
        <p className="text-center mb-12 max-w-7xl mx-auto font-bold text-[#1C1B3A] text-2xl">
          Escolha o melhor para você.
        </p>

        {/* Grid de cards responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {reorderedPlans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between rounded-lg shadow-md overflow-hidden transition-all duration-300 ${plan.bgClass} ${plan.customCardClass ?? ""}`}
            >
              {/* Cabeçalho do card */}
              <div className={`p-6 ${plan.name === "+VISIONÁRIO"
  ? " text-black bg-[#4f4992]"
  : plan.headerBgClass ?? "bg-slate-400"} min-h-[420px] flex items-center justify-evenly flex-col`}>

                {/* Nome do plano com imagem alinhada */}
                <div className="flex items-center justify-center gap-3 mb-4 bg-white p-2 rounded-full">
                  
                  <img src={trevo} alt="Simbolo de Mais" className="w-5 h-5" />
                  <h3 className={`font-poppins font-bold text-2xl ${plan.textClass}`}>
                    {plan.name.replace("+", "")}
                  </h3>
                </div>

                {/* Taglines - Centralizando e colocando uma embaixo da outra */}
                <div className="flex flex-col items-center text-center h-3/5">
                  {plan.tagline1 && (
                    <div className="inline-block bg-[#1C1B3A] text-white font-extrabold px-4 py-1 rounded-full uppercase shadow mb-3 text-lg">
                      {plan.tagline1}
                    </div>
                  )}
                  {plan.tagline2 && (
                    <p className={`${plan.textClass}/80 text-lg font-bold mb-1 tracking-tighter`}>
                      {plan.tagline2}
                    </p>
                  )}
                  {plan.tagline3 && (
                    <p className={`${plan.textClass}/60 font-medium mb-4 tracking-tighter`}>
                      {plan.tagline3}
                    </p>
                  )}
                </div>

                {/* Preços e bônus */}
                <div className="text-center space-y-1 w-full flex flex-col justify-center items-center h-2/5 gap-3">
                  <p className="text-2xl font-extrabold font-poppins">{plan.price}</p>
                  <p className="text-white text-lg font-extrabold font-poppins px-3 py-1 bg-green-600 rounded">
                    {plan.annualPrice}
                  </p>
                  {/* {plan.discount && (
                    <p className="text-lg font-extrabold text-black">{plan.discount}</p>
                  )} */}
                  
                  {/* Adicionado imagem SVG e frase */}
                  <div className="flex items-center justify-evenly gap-4 mt-3 w-full text-white">
                  {/* Imagem SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gift-icon lucide-gift"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
                  {/* Frase abaixo do no "Cartão sem juros"*/}
                  <span className="text-white font-medium">Aproveite esta condição exclusiva!</span> 
                  
                  
                  </div>

                </div>
              </div>

              {/* Conteúdo principal do card */}
              
              
              <div
  className={`p-4 flex flex-col ${
    plan.name === "+VISIONÁRIO"
      ? "bg-pink-100 text-black rounded-b-lg flex-grow font-extrabold"
      : "flex-1 justify-between"
  }`}
>
  {/* Lista de recursos */}
  {plan.name === "+VISIONÁRIO" ? (
    <div className="flex-grow flex items-center justify-center min-h-[180px]">
      <ul className={`space-y-2 text-left ${plan.textClass}`}>
        {plan.features.map((feature, i) => (
          <li key={i} className="flex justify-end gap-1 text-xl">
            <FaCheck className="text-green-400 mt-1" />
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <ul
      className={`text-lg divide-y text-left font-bold ${
        plan.textClass.includes("white")
          ? "divide-white/20 text-black"
          : "divide-neutral-900 text-stone-950"
      } mb-6`}
    >
      {plan.features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 py-2">
          {feature.included ? (
            <FaCheck className="text-green-500 mt-1" />
          ) : (
            <FaTimes className="text-red-500 mt-1" />
          )}
          <span className={feature.included ? "" : "opacity-60"}>{feature.text}</span>
        </li>
      ))}
    </ul>
  )}

                {/* Botão de WhatsApp */}
                <button
                  onClick={() => setModalOpenForPlan(index)}
                  className={`flex items-center justify-center gap-2 font-poppins font-medium px-6 py-3 rounded-md w-full ${plan.consultButtonClass}`}
                >
                  <FaWhatsapp /> Fale com um consultor
                </button>

                              {/* Modal de envio de dados */}
                              <Modal
                isOpen={modalOpenForPlan === index}
                onClose={() => setModalOpenForPlan(-1)}
                planName={plan.name}
                apiUrl="https://jsonplaceholder.typicode.com/posts"// <-- Adicione isso
                onSubmit={(name, phone) => handleSubmit(name, phone, index)}
              />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}