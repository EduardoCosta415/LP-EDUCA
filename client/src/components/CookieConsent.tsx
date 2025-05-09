import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem("cookie_consent");
    if (!consentGiven) setShow(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-50">
      <div className="bg-gray-900 bg-opacity-90 backdrop-blur-md text-white p-4 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-center sm:text-left leading-relaxed">
          Usamos cookies para melhorar sua experiência. Leia nossa{" "}
          <a href="/cookies" className="underline text-blue-400 hover:text-blue-300">
            Política de Cookies
          </a>.
        </p>
        <button
          onClick={handleAccept}
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-5 py-2 rounded-md transition"
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
