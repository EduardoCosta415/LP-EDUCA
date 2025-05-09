import { QueryClient, QueryFunction } from "@tanstack/react-query"; // Importa a biblioteca react-query para fazer requisições de API

// Função que verifica se a resposta da API foi bem-sucedida
async function throwIfResNotOk(res: Response) {
  if (!res.ok) { // Se a resposta da API não for ok (status diferente de 200-299)
    const text = (await res.text()) || res.statusText; // Pega o corpo da resposta ou o statusText (se o corpo estiver vazio)
    throw new Error(`${res.status}: ${text}`); // Lança um erro com o status e o corpo da resposta
  }
}

// Função para fazer uma requisição à API com método, URL e dados
export async function apiRequest(
  method: string, // Método HTTP (GET, POST, PUT, DELETE, etc.)
  url: string, // URL da API
  data?: unknown | undefined, // Dados a serem enviados no corpo da requisição (opcional)
): Promise<Response> {
  const res = await fetch(url, {
    method, // Define o método da requisição
    headers: data ? { "Content-Type": "application/json" } : {}, // Define o cabeçalho se houver dados
    body: data ? JSON.stringify(data) : undefined, // Converte os dados em JSON se eles existirem
    credentials: "include", // Inclui cookies na requisição, se necessário
  });

  await throwIfResNotOk(res); // Verifica se a resposta foi bem-sucedida, caso contrário, lança um erro
  return res; // Retorna a resposta da API
}

// Tipo para definir o comportamento caso a resposta seja 401 (não autorizado)
type UnauthorizedBehavior = "returnNull" | "throw";

// Função que retorna a função de consulta usada pelo react-query
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior; // Comportamento para a situação 401 (não autorizado)
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => { // A função de consulta recebe o "queryKey", que normalmente contém a URL
    const res = await fetch(queryKey[0] as string, { // Faz a requisição GET para a URL contida em queryKey[0]
      credentials: "include", // Inclui cookies na requisição
    });

    // Verifica o comportamento para status 401
    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null; // Se for "returnNull", retorna null caso a resposta seja 401
    }

    await throwIfResNotOk(res); // Verifica se a resposta é bem-sucedida, caso contrário, lança um erro
    return await res.json(); // Retorna o corpo da resposta como JSON
  };

// Criação do cliente de consulta (QueryClient) do react-query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }), // Define a função de consulta padrão para todas as queries
      refetchInterval: false, // Não refaz as requisições automaticamente em intervalos
      refetchOnWindowFocus: false, // Não refaz as requisições quando a janela recebe foco
      staleTime: Infinity, // Define o tempo de "stale" como infinito (os dados nunca são considerados "velhos")
      retry: false, // Não tenta refazer a requisição em caso de falha
    },
    mutations: {
      retry: false, // Não tenta refazer as mutações em caso de falha
    },
  },
});
