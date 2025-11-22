import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { FontProvider } from "./contexts/FontContext";
import Index from "./pages/Index";
import TypingTest from "./pages/TypingTest";
import Lessons from "./pages/Lessons";
import PracticeMode from "./pages/PracticeMode";
import ExamMode from "./pages/ExamMode";
import Games from "./pages/Games";
import Progress from "./pages/Progress";
import KeyboardGuide from "./pages/KeyboardGuide";
import AboutDeveloper from "./pages/AboutDeveloper";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <FontProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/typing-test" element={<TypingTest />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/practice" element={<PracticeMode />} />
              <Route path="/exam" element={<ExamMode />} />
              <Route path="/games" element={<Games />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/keyboard-guide" element={<KeyboardGuide />} />
              <Route path="/about-developer" element={<AboutDeveloper />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </FontProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
