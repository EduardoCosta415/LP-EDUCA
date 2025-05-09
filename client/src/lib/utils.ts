import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// utils/whatsapp.ts
export const WHATSAPP_CONFIG = {
  defaultNumber: '5531986212400',
  floatNumber: '5531991234567',
  defaultMessage: 'Olá!%20Gostaria%20de%20mais%20informações',
  getUrl: (number?: string, message?: string) => {
    const whatsappNumber = number || WHATSAPP_CONFIG.defaultNumber;
    const whatsappMessage = message || WHATSAPP_CONFIG.defaultMessage;
    return `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  }
};