import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import ForgotPasswordPage from "./pages/forgotpasswordpage"; // Corrected path
import LoginPage from "./pages/loginpage"; // Corrected path
import RegistrationPage from "./pages/registrationpage"; // Corrected path
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<RegistrationPage />} /> {/* Changed: / now shows RegistrationPage */}
          <Route path="/login" element={<LoginPage />} /> {/* Added: /login shows LoginPage */}
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          {/* Route path="/registration" element={<RegistrationPage />} /> Removed as / is now registration */}
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;