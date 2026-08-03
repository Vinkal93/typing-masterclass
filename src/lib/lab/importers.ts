/** Lazy-loaded document importers (PDF / DOCX / TXT / OCR image). */

export interface ImportedDoc {
  pages: string[];
  name: string;
  kind: "pdf" | "docx" | "txt" | "image";
}

export async function importPdf(file: File, onProgress?: (p: number) => void): Promise<ImportedDoc> {
  const pdfjs = await import("pdfjs-dist");
  const workerSrc = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
  const buf = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: buf }).promise;
  const pages: string[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((it) => ("str" in it ? (it as { str: string }).str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    pages.push(text);
    onProgress?.(Math.round((i / doc.numPages) * 100));
  }
  return { pages, name: file.name, kind: "pdf" };
}

export async function importDocx(file: File): Promise<ImportedDoc> {
  const mammoth = await import("mammoth/mammoth.browser");
  const buf = await file.arrayBuffer();
  const result = await (mammoth as unknown as { extractRawText: (o: { arrayBuffer: ArrayBuffer }) => Promise<{ value: string }> }).extractRawText({ arrayBuffer: buf });
  const text = result.value.trim();
  return { pages: splitPages(text), name: file.name, kind: "docx" };
}

export async function importTxt(file: File): Promise<ImportedDoc> {
  const text = (await file.text()).trim();
  return { pages: splitPages(text), name: file.name, kind: "txt" };
}

export async function importImageOcr(file: File, lang = "eng", onProgress?: (p: number) => void): Promise<ImportedDoc> {
  const { createWorker } = await import("tesseract.js");
  const worker = await createWorker(lang, undefined, {
    logger: (m: { status: string; progress: number }) => {
      if (m.status === "recognizing text") onProgress?.(Math.round(m.progress * 100));
    },
  });
  const { data } = await worker.recognize(file);
  await worker.terminate();
  return { pages: splitPages((data.text || "").trim()), name: file.name, kind: "image" };
}

export function splitPages(text: string, charsPerPage = 1800): string[] {
  if (text.length <= charsPerPage) return [text];
  const pages: string[] = [];
  let rest = text;
  while (rest.length) {
    if (rest.length <= charsPerPage) {
      pages.push(rest.trim());
      break;
    }
    let cut = rest.lastIndexOf(" ", charsPerPage);
    if (cut < charsPerPage * 0.5) cut = charsPerPage;
    pages.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut);
  }
  return pages;
}
