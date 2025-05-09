import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { ThemeProvider } from "next-themes";
import MatriculaSorte from "@/pages/MatriculaSorte"; // Corrigido o caminho
import PoliticaDeCookies from "@/pages/cookies"; // Importando a página de Cookies
import PoliticaDePrivacidade from "@/pages/privacidade"; // Importando a página de Privacidade
import CookieConsent from "./components/CookieConsent";
import Loading from "@/pages/loading";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/matriculasorte" component={MatriculaSorte} />
      <Route path="/cookies" component={PoliticaDeCookies} />
      <Route path="/privacidade" component={PoliticaDePrivacidade} />

      {/* ✅ Nova rota para o loading */}
      <Route path="/loading" component={Loading} />

      {/* Rota padrão 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <TooltipProvider>
          <Toaster />
          <Router />
          <CookieConsent/>
          <WhatsAppFloat />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;