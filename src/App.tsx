import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { FontProvider } from "./contexts/FontContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import Index from "./pages/Index";
import TypingTest from "./pages/TypingTest";
import Lessons from "./pages/Lessons";
import PracticeMode from "./pages/PracticeMode";
import ExamMode from "./pages/ExamMode";
import ExamHistory from "./pages/ExamHistory";
import Games from "./pages/Games";
import Progress from "./pages/Progress";
import FullHistory from "./pages/FullHistory";
import KeyboardGuide from "./pages/KeyboardGuide";
import AboutDeveloper from "./pages/AboutDeveloper";
import FastTrack from "./pages/FastTrack";
import SmartPractice from "./pages/SmartPractice";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <FontProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <SidebarProvider defaultOpen={false}>
                <div className="min-h-screen flex w-full">
                  <AppSidebar />
                  <main className="flex-1 overflow-x-hidden">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/typing-test" element={<TypingTest />} />
                      <Route path="/lessons" element={<Lessons />} />
                      <Route path="/practice" element={<PracticeMode />} />
                      <Route path="/exam" element={<ExamMode />} />
                      <Route path="/exam-history" element={<ExamHistory />} />
                      <Route path="/games" element={<Games />} />
                      <Route path="/progress" element={<Progress />} />
                      <Route path="/full-history" element={<FullHistory />} />
                      <Route path="/keyboard-guide" element={<KeyboardGuide />} />
                      <Route path="/about-developer" element={<AboutDeveloper />} />
                      <Route path="/fast-track" element={<FastTrack />} />
                      <Route path="/smart-practice" element={<SmartPractice />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
              </SidebarProvider>
            </BrowserRouter>
          </TooltipProvider>
        </FontProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
