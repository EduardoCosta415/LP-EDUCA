import { FaCheck, FaTimes, FaWhatsapp } from "react-icons/fa";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  tagline: string;
  price: string;
  annualPrice: string;
  discount: string;
  bgClass: string;
  textClass: string;
  buttonClass: string;
  popular?: boolean;
  features: PlanFeature[];
  whatsappText: string;
}

export default function PricingPlans() {
  const plans: PricingPlan[] = [
    {
      name: "Básico",
      tagline: "Ideal para iniciantes",
      price: "R$249",
      annualPrice: "R$2.490",
      discount: "15% de desconto",
      bgClass: "bg-neutral-100",
      textClass: "text-neutral-800",
      buttonClass: "bg-secondary hover:bg-secondary/90",
      features: [
        { text: "Acesso a 1 curso de pós-graduação", included: true },
        { text: "Material didático digital", included: true },
        { text: "Tutoria online", included: true },
        { text: "Certificado digital", included: true },
        { text: "Mentoria exclusiva", included: false },
        { text: "Networking premium", included: false },
      ],
      whatsappText: "Olá!%20Tenho%20interesse%20no%20plano%20Básico",
    },
    {
      name: "Profissional",
      tagline: "Para quem busca destaque",
      price: "R$349",
      annualPrice: "R$3.490",
      discount: "15% de desconto",
      bgClass: "bg-primary",
      textClass: "text-white",
      buttonClass: "bg-primary hover:bg-primary/90",
      popular: true,
      features: [
        { text: "Acesso a 2 cursos de pós-graduação", included: true },
        { text: "Material didático digital e impresso", included: true },
        { text: "Tutoria online e presencial", included: true },
        { text: "Certificado digital e impresso", included: true },
        { text: "Mentoria mensal", included: true },
        { text: "Networking premium", included: false },
      ],
      whatsappText: "Olá!%20Tenho%20interesse%20no%20plano%20Profissional",
    },
    {
      name: "Executivo",
      tagline: "Experiência completa",
      price: "R$499",
      annualPrice: "R$4.990",
      discount: "15% de desconto",
      bgClass: "bg-neutral-800",
      textClass: "text-white",
      buttonClass: "bg-neutral-800 hover:bg-neutral-700",
      features: [
        { text: "Acesso a todos os cursos da plataforma", included: true },
        { text: "Kit completo de materiais personalizados", included: true },
        { text: "Tutoria premium 24/7", included: true },
        { text: "Certificado internacional reconhecido", included: true },
        { text: "Mentoria semanal exclusiva", included: true },
        { text: "Networking premium e eventos exclusivos", included: true },
      ],
      whatsappText: "Olá!%20Tenho%20interesse%20no%20plano%20Executivo",
    },
  ];

  return (
    <section id="planos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-3xl text-center text-neutral-800 mb-2">
          Planos de Investimento
        </h2>
        <p className="text-neutral-500 text-center mb-12 max-w-3xl mx-auto">
          Escolha o plano que melhor se adapta à sua realidade e objetivos profissionais
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden border border-neutral-200 transition hover:shadow-lg hover:border-primary/20 ${
                plan.popular ? "shadow-xl border-2 border-primary transform md:scale-105 z-10" : ""
              }`}
            >
              <div className={`${plan.bgClass} p-6 text-center`}>
                {plan.popular && (
                  <span className="bg-white text-primary text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">
                    Mais popular
                  </span>
                )}
                <h3 className={`font-poppins font-bold text-2xl ${plan.textClass} mb-1`}>{plan.name}</h3>
                <p className={`${plan.textClass}/80 mb-4`}>{plan.tagline}</p>
                <div className="flex items-center justify-center">
                  <span className={`text-4xl font-poppins font-bold ${plan.textClass}`}>{plan.price}</span>
                  <span className={`${plan.textClass}/80 ml-2`}>/mês</span>
                </div>
                <p className={`${plan.textClass}/80 text-sm mt-2`}>
                  ou {plan.annualPrice} à vista ({plan.discount})
                </p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <>
                          <FaCheck className="text-accent mt-1 mr-3" />
                          <span>{feature.text}</span>
                        </>
                      ) : (
                        <>
                          <FaTimes className="text-neutral-400 mt-1 mr-3" />
                          <span className="text-neutral-400">{feature.text}</span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/5531999999999?text=${plan.whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 ${plan.buttonClass} text-white font-poppins font-medium px-6 py-3 rounded-md transition block text-center`}
                >
                  <FaWhatsapp className="inline mr-2" /> Fale com um consultor
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
