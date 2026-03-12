import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./store/AuthProvider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <ToastContainer position="bottom-center" />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
