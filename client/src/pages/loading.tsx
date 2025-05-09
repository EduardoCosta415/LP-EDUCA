import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

function parseQuery(queryString: string) {
  const params = new URLSearchParams(queryString);
  return {
    name: params.get('name') || '',
    phone: params.get('phone') || '',
    plan: params.get('plan') || '',
  };
}

export default function LoadingPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const sendData = async () => {
      const queryString = window.location.search;
      const { name, phone, plan } = parseQuery(queryString);

      if (!name || !phone) {
        setStatus('error');
        return;
      }

      const message = `Olá! Meu nome é ${name} e tenho interesse no plano ${plan || 'indefinido'}.`;

      try {
        // Fazendo a requisição POST para a API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {  // URL da sua API
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, phone, message }),  // Dados que você quer enviar
        });

        if (!response.ok) throw new Error('Erro ao enviar dados');

        setStatus('success');
        setTimeout(() => setLocation('/'), 6000); // Redireciona após 3s
      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    };

    sendData();
  }, [location, setLocation]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {status === 'loading' && (
        <div className="text-center">
          <p className="text-lg font-semibold animate-pulse">Enviando seus dados...</p>
        </div>
      )}
      {status === 'success' && (
        <div className="text-center">
          <p className="text-green-600 text-xl font-bold">Dados enviados com sucesso!</p>
          <p className="text-neutral-600 mt-2">Um consultor entrará em contato em breve.</p>
        </div>
      )}
      {status === 'error' && (
        <div className="text-center">
          <p className="text-red-600 text-xl font-bold">Erro ao enviar seus dados.</p>
          <p className="text-neutral-600 mt-2">Tente novamente mais tarde.</p>
        </div>
      )}
    </div>
  );
}
