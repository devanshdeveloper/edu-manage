import { HeroUIProvider } from "@heroui/system";
import { useHref, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@heroui/toast";
export function Provider({ children }) {
  const navigate = useNavigate();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider navigate={navigate} useHref={useHref}>
          <ToastProvider />
          <AuthProvider>{children}</AuthProvider>
        </HeroUIProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
