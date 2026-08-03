export const PARAGRAPH_CATEGORIES = [
  "Easy",
  "Medium",
  "Hard",
  "Story",
  "Office Letter",
  "Government Letter",
  "Essay",
  "News",
  "Computer",
  "Coding",
  "Legal",
  "Hindi",
  "English",
  "Mixed",
] as const;

export type ParagraphCategory = (typeof PARAGRAPH_CATEGORIES)[number];

export const PARAGRAPH_BANK: Record<string, string[]> = {
  Easy: [
    "The sun rose over the quiet hills and the birds began to sing. A soft wind moved through the trees while the village slowly woke up. People opened their windows and greeted each other with a smile. It was a simple morning, but it felt calm and complete in every way.",
    "She kept a small notebook in her bag and wrote one line every day. Some lines were about the weather, others about people she met on the bus. Over the years the notebook became a quiet record of an ordinary life that was never really ordinary at all.",
  ],
  Medium: [
    "Modern workplaces depend heavily on accurate typing because most communication now happens through written messages. A person who types quickly but carelessly often spends more time correcting mistakes than a slower typist who focuses on accuracy from the very first keystroke.",
    "Learning a new skill requires patience, structure and honest feedback. Progress rarely arrives in a straight line; instead it appears in small bursts followed by long stretches where nothing seems to change. Those quiet stretches are usually where the real improvement is happening.",
  ],
  Hard: [
    "Notwithstanding the committee's earlier recommendation (dated 14/03/2024), the sub-clause 7(b)(iii) shall remain applicable to all 1,286 registered candidates whose applications were received before 5:30 p.m.; any deviation must be justified in writing & approved by the competent authority.",
    "The quarterly reconciliation identified 42 discrepancies amounting to ₹8,74,530 across 17 ledgers, of which 9 were attributable to duplicate entries, 5 to incorrect GST classification (18% vs. 12%), and the remaining 3 to unposted journal vouchers dated 29-02-2024.",
  ],
  Story: [
    "The old lighthouse keeper had not received a letter in eleven years. Every evening he climbed the spiral stairs, lit the lamp, and watched the grey water fold over itself. One winter night a boat appeared, carrying a girl who claimed to be his granddaughter, and everything he believed about his own life quietly rearranged itself.",
  ],
  "Office Letter": [
    "Dear Mr. Sharma,\n\nWith reference to your email dated 12 June 2024, we are pleased to confirm that your order (Ref: PO-2024-0871) has been processed and dispatched. The consignment is expected to reach your Nagpur warehouse within five working days. Kindly acknowledge receipt and inform us of any discrepancy within 48 hours.\n\nYours sincerely,\nOperations Department",
  ],
  "Government Letter": [
    "No. F. 12-04/2024-Admn.\nGovernment of India\nMinistry of Personnel, Public Grievances and Pensions\n\nSubject: Implementation of revised guidelines regarding computer typing test for direct recruitment.\n\nSir/Madam,\n\nI am directed to refer to the subject cited above and to state that the competent authority has approved the revised qualifying standard of 35 words per minute in English and 30 words per minute in Hindi, effective from 01 July 2024. All concerned offices are requested to ensure strict compliance.",
  ],
  Essay: [
    "Discipline is often mistaken for restriction, but it is in fact the foundation of freedom. A student who studies at a fixed hour each day gradually earns the ability to learn anything they choose. Discipline converts scattered effort into direction, and direction is what turns ambition into achievement over a long period of time.",
  ],
  News: [
    "NEW DELHI, 18 April: The Department of Education announced on Thursday that digital literacy assessments will be introduced in 1,200 government schools from the next academic session. Officials said the programme, with an outlay of ₹340 crore, will focus on keyboard proficiency, basic office software and safe internet practices for students in classes six to twelve.",
  ],
  Computer: [
    "An operating system manages hardware resources and provides common services for application programs. It handles process scheduling, memory allocation, file systems, and device drivers. Without this abstraction layer, every application would need to communicate directly with the hardware, which would make software development impractical and extremely error-prone.",
  ],
  Coding: [
    "function debounce(fn, delay = 300) {\n  let timer = null;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}\n\nconst onSearch = debounce((query) => {\n  fetch(`/api/search?q=${encodeURIComponent(query)}`)\n    .then((res) => res.json())\n    .then((data) => render(data.items));\n}, 250);",
  ],
  Legal: [
    "This Agreement shall be governed by and construed in accordance with the laws of India, and the parties hereby submit to the exclusive jurisdiction of the courts at New Delhi. Any notice required hereunder shall be deemed duly served if sent by registered post or by electronic mail to the addresses first written above.",
  ],
  Hindi: [
    "भारत एक विशाल और विविधताओं से भरा देश है। यहाँ अनेक भाषाएँ बोली जाती हैं और अनेक त्योहार मनाए जाते हैं। इस विविधता के बावजूद देश की एकता कभी कमजोर नहीं पड़ी, क्योंकि यहाँ के लोग एक-दूसरे की संस्कृति का सम्मान करना जानते हैं।",
    "कंप्यूटर पर हिंदी टाइपिंग सीखने के लिए नियमित अभ्यास सबसे महत्वपूर्ण है। प्रतिदिन बीस मिनट का अभ्यास कुछ ही महीनों में गति और शुद्धता दोनों में उल्लेखनीय सुधार ला सकता है।",
  ],
  English: [
    "Consistent practice is more valuable than occasional intensity. Twenty focused minutes each day will build stronger muscle memory than three unfocused hours once a week, because the brain consolidates motor patterns during rest between sessions rather than during the sessions themselves.",
  ],
  Mixed: [
    "The meeting is scheduled for 10:30 a.m. on 25-07-2024 in Room #402. कृपया समय पर उपस्थित हों। Please carry the revised report (v2.3), 4 printed copies & the signed annexure; late entries will not be permitted after 10:45 a.m.",
  ],
};

export function randomParagraph(category: string, avoid: string[] = []): string {
  const pool = PARAGRAPH_BANK[category] || PARAGRAPH_BANK.Medium;
  const fresh = pool.filter((p) => !avoid.includes(p));
  const list = fresh.length ? fresh : pool;
  return list[Math.floor(Math.random() * list.length)];
}
