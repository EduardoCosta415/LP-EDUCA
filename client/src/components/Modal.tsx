// Importações de bibliotecas necessárias
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Tipos e interfaces
type ApiError = {
  status?: number;
  message: string;
  details?: any;
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
  planQuantity?: string;
  planPrice?: string;
  Tagline1?: string;
  apiUrl?: string;
  onSubmit?: (name: string, phone: string) => void;
}

interface ApiPayload {
  full_name: string;
  phone: string;
  promotion_name: string;
 promotion_quantity:string// ou simplesmente `plan.tagline1` se quiser manter a string literal
  promotion_price: number;
  utm: string;
  graduation: string
}

// Constantes configuráveis
const DEFAULT_API_URL = "https://www.polofaculdades.com.br/meta/send";
const API_TIMEOUT = 10000; // 10 segundos
const MESSAGE_DISPLAY_TIME = 5000; // 5 segundos
// let apiKey = "";
// if(process.env.NEXT_PUBLIC_API_KEY != null) {
//   apiKey = process.env.NEXT_PUBLIC_API_KEY;
// }

export default function Modal({ isOpen, onClose, planName, Tagline1, apiUrl = DEFAULT_API_URL }: ModalProps) {
  // Estados
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    graduation: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: ''
  });

  const [apiState, setApiState] = useState<{
    isLoading: boolean;
    isSuccess: boolean;
    error: ApiError | null;
  }>({
    isLoading: false,
    isSuccess: false,
    error: null
  });

  // Resetar estados quando o modal abre
  useEffect(() => {
    if (isOpen) {
      resetStates();
    }
  }, [isOpen]);

  const resetStates = () => {
    setFormData({ full_name: '', phone: '', graduation: '' });
    setErrors({ name: '', phone: '' });
    setApiState({
      isLoading: false,
      isSuccess: false,
      error: null
    });
  };

  const validateForm = (): boolean => {
    const newErrors = { name: '', phone: '' };
    let isValid = true;

    if (!formData.full_name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }

    const cleanedPhone = formData.phone.replace(/\D/g, '');
    if (!cleanedPhone) {
      newErrors.phone = 'Telefone é obrigatório';
      isValid = false;
    } else if (!/^\d{10,11}$/.test(cleanedPhone)) {
      newErrors.phone = 'Telefone inválido (DDD + número)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData.graduation)

    if (!validateForm()) return;

    setApiState({
      isLoading: true,
      isSuccess: false,
      error: null
    });
    
    // Delay de 3 segundos antes de continuar
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    const payload: ApiPayload = {
      full_name: formData.full_name,
      phone: formData.phone.replace(/\D/g, ''),
      promotion_name: planName || "Plano não especificado",
      //  promotion_quantity: Number(Tagline1?.replace(/\D/g, '')) || 1,
     promotion_quantity: Tagline1 || "",
      promotion_price: 0, // Ajuste conforme necessário
      utm: new URLSearchParams(window.location.search).get('utm_source') || "",
      graduation: formData.graduation
    };

    console.log(payload.promotion_quantity)

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
    "Authorization": `Bearer sk_educaMaisMinas123API332Key_4eC1f2a3-0b7-4c5b-8d6c-9f3e2a3b4e5d`
            
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw {
          status: response.status,
          message: errorData.message || `Erro na requisição: ${response.statusText}`,
          details: errorData
        };
      }

      const data = await response.json();

      setApiState({
        isLoading: false,
        isSuccess: true,
        error: null
      });

      // Fechar modal após delay
      setTimeout(() => {
        window.location.href = 'https://poseducamaisminas.com.br/track/'
      }, MESSAGE_DISPLAY_TIME);

    } catch (error: any) {
      clearTimeout(timeoutId);

      console.error("Erro na requisição:", error);

      const apiError: ApiError = {
        status: error.status,
        message: error.name === 'AbortError'
          ? 'A requisição demorou muito. Verifique sua conexão.'
          : error.message || 'Erro desconhecido ao enviar os dados',
        details: error.details
      };

      setApiState({
        isLoading: false,
        isSuccess: false,
        error: apiError
      });

      // Fechar modal após delay em caso de erro
      setTimeout(() => {
        onClose();
      }, MESSAGE_DISPLAY_TIME);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    console.log(e.target.value)

    if (name === 'phone') {
      const formatted = formatPhone(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Limpar erro quando o usuário digitar
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const formatPhone = (value: string): string => {
    const digits = value.replace(/\D/g, '');

    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  };

  // Renderização condicional
  const renderContent = () => {
    if (apiState.isLoading) {
      return (
        <div className="text-center py-10">
          <div className="animate-spin h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-neutral-600 text-lg">Enviando seus dados...</p>
          <p className="text-neutral-400 text-sm mt-1">Por favor, aguarde</p>
        </div>
      );
    }

    if (apiState.isSuccess) {
      return (
        <div className="text-center py-10">
          <div className="bg-green-100 text-green-600 rounded-full p-3 inline-block mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-green-600 mb-2">Sucesso!</h3>
          <p className="text-neutral-600">Seus dados foram enviados com sucesso.</p>
          <p className="text-neutral-500 text-sm mt-2">Você será contatado em breve.</p>
        </div>
      );
    }

    if (apiState.error) {
      return (
        <div className="text-center py-10">
          <div className="bg-red-100 text-red-600 rounded-full p-3 inline-block mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-red-600 mb-2">Erro no envio</h3>
          <p className="text-neutral-600">{apiState.error.message}</p>
          {apiState.error.status && (
            <p className="text-neutral-500 text-sm mt-2">Código: {apiState.error.status}</p>
          )}
        </div>
      );
    }

    return (
      <>
        <div className="text-center mb-6">
          <h3 className="font-semibold text-2xl mb-2 text-gray-800">Entre em contato</h3>
          <p className="text-gray-500">Preencha seus dados para continuar</p>
          {planName && (
            <div className="mt-3 bg-blue-50 text-blue-600 rounded-lg py-2 px-3 inline-block">
              <span className="text-sm">Conteudo Selecionado: <strong>{planName}</strong></span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo *
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              className={`w-full px-4 py-3 border text-black ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg  focus:ring-green-500 transition`}
              value={formData.full_name}
              onChange={handleInputChange}
              placeholder="Seu nome completo"
            />
            {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={`w-full px-4 py-3 border text-black ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition`}
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="(00) 00000-0000"
              maxLength={15}
            />
            {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div className="flex flex-col gap-1 text-gray-700">
            <span className="text-center">Você é graduado? *</span>
            <div className='w-full h-auto flex justify-center items-center gap-8'>
              <div className='flex gap-2 items-center'>
                <input
                  type="radio"
                  name="graduacao"
                  id="graduacao"
                  value="Sim"
                  required
                  onChange={(e) =>
                    setFormData(prevState => ({
                      ...prevState,
                      graduation: e.target.value
                    }))
                  }
                />
                <span className='font-medium'>Sim</span>
              </div>
              <div className='flex gap-2 items-center'>
                <input
                  type="radio"
                  name="graduacao"
                  id="graduacao1"
                  value="Não"
                  onChange={(e) =>
                    setFormData(prevState => ({
                      ...prevState,
                      graduation: e.target.value
                    }))
                  }
                />
                <span className='font-medium'>Não</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="text-lg" /> Enviar
            </button>
          </div>
        </form>
      </>
    );
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 20 }
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl"
        >
          {renderContent()}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}