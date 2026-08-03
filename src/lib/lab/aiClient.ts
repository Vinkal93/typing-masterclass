import { supabase } from "@/integrations/supabase/client";
import type { LabError, CoachReport } from "./settings";
import type { LiveStats } from "./stats";

async function invoke<T>(body: Record<string, unknown>): Promise<{ data?: T; error?: string }> {
  const { data, error } = await supabase.functions.invoke("typing-lab-ai", { body });
  if (error) {
    const msg = error.message || "AI request failed";
    return { error: msg };
  }
  if (data && (data as { error?: string }).error) return { error: (data as { error: string }).error };
  return { data: data as T };
}

export const aiGenerateParagraph = (category: string, language: string, words: number) =>
  invoke<{ text: string }>({ action: "generate", category, language, words });

export const aiAnalyze = (reference: string, typed: string) =>
  invoke<{ errors: LabError[] }>({ action: "analyze", reference, typed });

export const aiCoach = (stats: LiveStats, errors: LabError[], weakKeys: string[]) =>
  invoke<CoachReport>({ action: "coach", stats, errors, weakKeys });
