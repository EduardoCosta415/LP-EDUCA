import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
  apiUrl?: string;
  onSubmit?: (name: string, phone: string) => void;
}

export default function Modal({ 
  isOpen, 
  onClose,
  planName
}: ModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '' });
  const [_, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { name: '', phone: '' };
    let hasError = false;

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      hasError = true;
    }

    if (!phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
      hasError = true;
    } else if (!/^\d{10,11}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Telefone inválido';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const query = new URLSearchParams({
      name,
      phone,
      plan: planName || 'indefinido'
    }).toString();

    setLocation(`/loading?${query}`);
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div 
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
          >
            <div className="text-center mb-4">
  <h3 className="font-poppins font-semibold text-xl mb-2">Entre em contato pelo WhatsApp</h3>
  <p className="text-neutral-500">Preencha seus dados para continuar</p>
  {planName && (
    <p className="text-sm text-blue-600 mt-2">
      Você selecionou o plano: <strong>{planName}</strong>
    </p>
  )}
</div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-left">
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome"
                />
                {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name}</p>}
              </div>
              
              <div className="text-left">
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                  Telefone (WhatsApp)
                </label>
                <input
                  type="text"
                  id="phone"
                  className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-neutral-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                />
                {errors.phone && <p className="mt-1 text-red-500 text-xs">{errors.phone}</p>}
              </div>

              <div className="flex justify-between space-x-4 pt-2">
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 font-poppins rounded hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white font-poppins rounded hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <FaWhatsapp /> Enviar
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
