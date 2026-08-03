import type { LiveStats } from "./stats";
import type { LabError, CoachReport } from "./settings";

export function exportCsv(stats: LiveStats, errors: LabError[]) {
  const rows: string[][] = [["Metric", "Value"]];
  Object.entries(stats).forEach(([k, v]) => rows.push([k, String(v)]));
  rows.push([], ["Word", "Expected", "Type", "Reason", "Suggestion"]);
  errors.forEach((e) => rows.push([e.word, e.expected, e.type, e.reason, e.suggestion]));
  const csv = rows.map((r) => r.map((c) => `"${(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
  download(new Blob([csv], { type: "text/csv;charset=utf-8" }), "typing-lab-report.csv");
}

export async function exportExcel(stats: LiveStats, errors: LabError[]) {
  const XLSX = await import("xlsx");
  const wb = XLSX.utils.book_new();
  const statSheet = XLSX.utils.json_to_sheet([stats as unknown as Record<string, unknown>]);
  XLSX.utils.book_append_sheet(wb, statSheet, "Statistics");
  const errSheet = XLSX.utils.json_to_sheet(errors.length ? errors : [{ info: "No errors" }]);
  XLSX.utils.book_append_sheet(wb, errSheet, "Errors");
  XLSX.writeFile(wb, "typing-lab-report.xlsx");
}

export async function exportPdfReport(stats: LiveStats, errors: LabError[], report: CoachReport | null, studentName: string) {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("Advanced Typing Lab — Session Report", 14, 20);
  doc.setFontSize(11);
  doc.text(`Name: ${studentName || "Guest"}`, 14, 30);
  doc.text(`Date: ${new Date().toLocaleString()}`, 14, 37);

  let y = 50;
  doc.setFontSize(14);
  doc.text("Statistics", 14, y);
  doc.setFontSize(10);
  y += 8;
  Object.entries(stats).forEach(([k, v]) => {
    doc.text(`${k}: ${typeof v === "number" ? Math.round(v * 100) / 100 : v}`, 16, y);
    y += 6;
    if (y > 275) {
      doc.addPage();
      y = 20;
    }
  });

  if (report) {
    doc.addPage();
    y = 20;
    doc.setFontSize(14);
    doc.text("AI Coach Report", 14, y);
    doc.setFontSize(10);
    y += 10;
    const lines = [
      `Overall Score: ${report.overallScore}`,
      `Typing: ${report.typingScore}  Grammar: ${report.grammarScore}  Readability: ${report.readability}`,
      `Sentence Quality: ${report.sentenceQuality}  Professional: ${report.professionalScore}`,
      `Weak Keys: ${report.weakKeys?.join(", ")}`,
      `Weak Grammar: ${report.weakGrammarTopics?.join(", ")}`,
      `Daily Practice: ${report.dailyPractice}`,
      `Estimated Improvement: ${report.estimatedImprovementTime}`,
      "",
      "Suggestions:",
      ...(report.suggestions || []).map((s) => `• ${s}`),
    ];
    lines.forEach((l) => {
      doc.splitTextToSize(l, 180).forEach((seg: string) => {
        doc.text(seg, 16, y);
        y += 6;
        if (y > 275) {
          doc.addPage();
          y = 20;
        }
      });
    });
  }

  if (errors.length) {
    doc.addPage();
    y = 20;
    doc.setFontSize(14);
    doc.text("Detected Errors", 14, y);
    doc.setFontSize(9);
    y += 10;
    errors.forEach((e, i) => {
      const line = `${i + 1}. "${e.word}" → "${e.expected}" [${e.type}] ${e.reason}`;
      doc.splitTextToSize(line, 180).forEach((seg: string) => {
        doc.text(seg, 16, y);
        y += 5;
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
      });
    });
  }

  doc.save("typing-lab-report.pdf");
}

export async function exportCertificate(stats: LiveStats, name: string) {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation: "landscape" });
  doc.setDrawColor(180, 140, 40);
  doc.setLineWidth(3);
  doc.rect(10, 10, 277, 190);
  doc.setFontSize(30);
  doc.text("Certificate of Typing Proficiency", 148, 45, { align: "center" });
  doc.setFontSize(14);
  doc.text("This is to certify that", 148, 68, { align: "center" });
  doc.setFontSize(26);
  doc.text(name || "Guest Typist", 148, 85, { align: "center" });
  doc.setFontSize(13);
  doc.text(
    `has completed an Advanced Typing Lab session with ${stats.wpm} WPM, ${stats.cpm} CPM`,
    148,
    103,
    { align: "center" }
  );
  doc.text(`and ${Math.round(stats.accuracy)}% accuracy over ${Math.round(stats.elapsed)} seconds.`, 148, 113, {
    align: "center",
  });
  doc.setFontSize(11);
  doc.text(new Date().toLocaleDateString(), 45, 170);
  doc.text("Vinkal Prajapati — Typing Master", 210, 170);
  doc.save("typing-certificate.pdf");
}

export function printReport() {
  window.print();
}

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
