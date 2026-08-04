import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  Shuffle,
  Sparkles,
  Upload,
  ZoomIn,
  ZoomOut,
  X,
  GripVertical,
  Loader2,
} from "lucide-react";
import { PARAGRAPH_CATEGORIES, buildParagraph } from "@/lib/lab/paragraphs";

const LENGTH_OPTIONS = [50, 100, 150, 200, 300, 500, 750, 1000, 1500, 2000];

import { importDocx, importImageOcr, importPdf, importTxt, splitPages } from "@/lib/lab/importers";
import { aiGenerateParagraph } from "@/lib/lab/aiClient";
import { toast } from "sonner";

interface Props {
  pages: string[];
  pageIndex: number;
  zoom: number;
  docName: string;
  onSetPages: (pages: string[], name: string) => void;
  onPageChange: (i: number) => void;
  onZoom: (z: number) => void;
  onClose: () => void;
  floating?: boolean;
  onDragStart?: (e: React.PointerEvent) => void;
}

export default function ReferencePanel({
  pages,
  pageIndex,
  zoom,
  docName,
  onSetPages,
  onPageChange,
  onZoom,
  onClose,
  floating,
  onDragStart,
}: Props) {
  const [category, setCategory] = useState<string>("Medium");
  const [length, setLength] = useState<number>(150);

  const [custom, setCustom] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    const ext = file.name.split(".").pop()?.toLowerCase();
    try {
      setProgress(0);
      setBusy("Reading document...");
      let doc;
      if (ext === "pdf") doc = await importPdf(file, setProgress);
      else if (ext === "docx") doc = await importDocx(file);
      else if (ext === "txt") doc = await importTxt(file);
      else throw new Error("Unsupported file type");
      onSetPages(doc.pages, doc.name);
      toast.success(`${doc.name} loaded — ${doc.pages.length} page(s)`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to read file");
    } finally {
      setBusy(null);
      setProgress(0);
    }
  };

  const handleImage = async (file: File) => {
    try {
      setProgress(0);
      setBusy("Running OCR...");
      const doc = await importImageOcr(file, "eng", setProgress);
      onSetPages(doc.pages, doc.name);
      toast.success("OCR complete");
    } catch {
      toast.error("OCR failed");
    } finally {
      setBusy(null);
      setProgress(0);
    }
  };

  const generateAi = async () => {
    setBusy("Generating with AI...");
    const { data, error } = await aiGenerateParagraph(category, category === "Hindi" ? "Hindi" : "English", length);
    setBusy(null);
    if (error || !data?.text) {
      toast.error(error?.includes("429") ? "AI rate limit — try again shortly" : error?.includes("402") ? "AI credits exhausted" : "AI generation failed");
      return;
    }
    onSetPages(splitPages(data.text), `AI Generated · ${length} words`);

  };

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="flex items-center gap-2 border-b px-3 py-2">
        {floating && (
          <button onPointerDown={onDragStart} className="cursor-grab text-muted-foreground active:cursor-grabbing">
            <GripVertical className="h-4 w-4" />
          </button>
        )}
        <FileText className="h-4 w-4 text-primary" />
        <span className="truncate text-sm font-semibold">{docName || "Practice Panel"}</span>
        <div className="ml-auto flex items-center gap-1">
          <Button size="icon" variant="ghost" onClick={() => onZoom(Math.max(60, zoom - 10))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-xs tabular-nums text-muted-foreground">{zoom}%</span>
          <Button size="icon" variant="ghost" onClick={() => onZoom(Math.min(220, zoom + 10))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="source" className="flex min-h-0 flex-1 flex-col">
        <TabsList className="mx-3 mt-2 grid grid-cols-2">
          <TabsTrigger value="source">Reference</TabsTrigger>
          <TabsTrigger value="load">Load Text</TabsTrigger>
        </TabsList>

        <TabsContent value="source" className="min-h-0 flex-1 overflow-auto px-4 py-3 m-0">
          {pages.length ? (
            <p
              className="whitespace-pre-wrap break-words leading-relaxed text-foreground/90"
              style={{ fontSize: `${zoom / 100}rem` }}
            >
              {pages[pageIndex]}
            </p>
          ) : (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Load a paragraph, document or AI text to start practising.
            </p>
          )}
        </TabsContent>

        <TabsContent value="load" className="min-h-0 flex-1 space-y-3 overflow-auto px-3 py-3 m-0">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-muted-foreground">Random paragraph</label>
            <div className="flex gap-2">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-50 bg-popover">
                  {PARAGRAPH_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={String(length)} onValueChange={(v) => setLength(Number(v))}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-50 bg-popover">
                  {LENGTH_OPTIONS.map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} words
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onSetPages(splitPages(buildParagraph(category, length, pages)), `${category} · ${length} words`)}
            >
              <Shuffle className="mr-1 h-4 w-4" /> Random paragraph
            </Button>
            <Button className="w-full" onClick={generateAi} disabled={!!busy}>
              <Sparkles className="mr-1 h-4 w-4" /> AI Generate ({category}, {length}w)
            </Button>
          </div>


          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-muted-foreground">Custom / paste text</label>
            <Textarea
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Paste your paragraph here..."
              className="min-h-[110px]"
            />
            <Button
              variant="secondary"
              className="w-full"
              disabled={!custom.trim()}
              onClick={() => onSetPages(splitPages(custom.trim()), "Custom text")}
            >
              Use this text
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-muted-foreground">Upload</label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => fileRef.current?.click()} disabled={!!busy}>
                <Upload className="mr-1 h-4 w-4" /> PDF/DOCX/TXT
              </Button>
              <Button variant="outline" onClick={() => imgRef.current?.click()} disabled={!!busy}>
                <ImageIcon className="mr-1 h-4 w-4" /> OCR Image
              </Button>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.docx,.txt"
              hidden
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            <input
              ref={imgRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => e.target.files?.[0] && handleImage(e.target.files[0])}
            />
            {busy && (
              <div className="space-y-1">
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" /> {busy}
                </p>
                {progress > 0 && <Progress value={progress} className="h-1" />}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {pages.length > 1 && (
        <div className="flex items-center justify-between border-t px-3 py-2">
          <Button size="sm" variant="ghost" disabled={pageIndex === 0} onClick={() => onPageChange(pageIndex - 1)}>
            <ChevronLeft className="h-4 w-4" /> Prev
          </Button>
          <span className="text-xs text-muted-foreground">
            Page {pageIndex + 1} / {pages.length}
          </span>
          <Button
            size="sm"
            variant="ghost"
            disabled={pageIndex >= pages.length - 1}
            onClick={() => onPageChange(pageIndex + 1)}
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </Card>
  );
}
