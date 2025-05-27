import React from "react";
import Home from "@/pages/Home";
import WhatsAppFloat from "./components/WhatsAppFloat";
import CookieConsent from "./components/CookieConsent";

function App() {
  return (    
    <>
      <Home />
      <WhatsAppFloat />
      <CookieConsent />
    </>
  );
}

export default App;