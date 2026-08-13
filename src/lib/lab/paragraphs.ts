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

/**
 * Sentence pools per category. Paragraphs are composed by sampling unique
 * sentences from these pools, so the effective paragraph bank is far larger
 * than 200 variations per category and rarely repeats.
 */
export const SENTENCE_POOLS: Record<string, string[]> = {
  Easy: [
    "The sun rose over the quiet hills and the birds began to sing.",
    "A soft wind moved through the trees while the village slowly woke up.",
    "People opened their windows and greeted each other with a smile.",
    "It was a simple morning, but it felt calm and complete in every way.",
    "She kept a small notebook in her bag and wrote one line every day.",
    "Some lines were about the weather, others about people she met on the bus.",
    "The old baker always gave the first loaf of the day to the street dog.",
    "Children ran across the field with kites that danced above the rooftops.",
    "A cup of warm tea can turn an ordinary evening into a small celebration.",
    "He watered the plants on the balcony before the city grew loud again.",
    "The river moved slowly, carrying leaves from somewhere far upstream.",
    "Every good habit begins with one small action repeated without excuses.",
    "The library was quiet except for the soft sound of turning pages.",
    "They walked home together and counted the lights along the road.",
    "Rain tapped on the window like a friend asking to come inside.",
    "A kind word costs nothing but often stays with someone for years.",
  ],
  Medium: [
    "Modern workplaces depend heavily on accurate typing because most communication now happens through written messages.",
    "A person who types quickly but carelessly often spends more time correcting mistakes than a slower typist who values accuracy.",
    "Learning a new skill requires patience, structure and honest feedback from someone who has already walked the path.",
    "Progress rarely arrives in a straight line; it appears in small bursts followed by long stretches of apparent stillness.",
    "Those quiet stretches are usually where the real improvement is quietly happening beneath the surface.",
    "Setting a fixed practice time each day removes the daily negotiation between motivation and comfort.",
    "Professional writing rewards clarity far more than complexity, and short sentences often carry the most weight.",
    "When you measure your speed honestly, you gain the ability to improve it deliberately rather than accidentally.",
    "Good posture, relaxed shoulders and light key pressure protect your wrists during long typing sessions.",
    "Most typing errors repeat themselves, which means a small set of targeted drills can remove a large share of mistakes.",
    "Reading ahead by two or three words allows your fingers to prepare before your eyes arrive at the letter.",
    "Consistency beats intensity because the brain consolidates motor patterns between sessions, not only during them.",
    "A quiet room, a clean desk and a fixed goal will improve your practice more than any expensive keyboard.",
    "Feedback is only useful when it is specific, timely and connected to something you can actually change.",
    "The difference between an amateur and a professional is often nothing more than the number of honest repetitions.",
    "Typing tests should be treated as measurements, not as judgements about your ability or your future.",
  ],
  Hard: [
    "Notwithstanding the committee's earlier recommendation (dated 14/03/2024), sub-clause 7(b)(iii) shall remain applicable to all 1,286 registered candidates.",
    "Any deviation must be justified in writing & approved by the competent authority before 5:30 p.m. on the closing date.",
    "The quarterly reconciliation identified 42 discrepancies amounting to Rs. 8,74,530 across 17 ledgers maintained by the regional office.",
    "Of these, 9 were attributable to duplicate entries, 5 to incorrect GST classification (18% vs. 12%), and 3 to unposted journal vouchers.",
    "Invoice #INV-2024/0917-B was raised on 29-02-2024 for Rs. 1,04,299.50 including freight, insurance and handling charges.",
    "The candidate must score >= 85% accuracy and >= 40 w.p.m. in a 10-minute test conducted under CCTV supervision.",
    "Reference: F.No. 21/07/2023-Estt.(A-IV) read with O.M. dated 11.09.2023 issued by the Department of Expenditure.",
    "Temperatures ranged from -3.6°C to 41.8°C, while humidity fluctuated between 12% and 96% during the same 24-hour window.",
    "The API returned {\"status\":429,\"retry_after\":30} for approximately 7.4% of requests during the peak load window.",
    "Payment of Rs. 2,35,000/- (Rupees Two Lakh Thirty-Five Thousand only) shall be released within 30 days of certification.",
    "Serial numbers TM-000418, TM-000419 and TM-000421 were found defective; TM-000420 was not traced in the stock register.",
    "Please quote the reference number ABC/XYZ-2024/Q3-117 in all future correspondence relating to this matter.",
    "The ratio improved from 1:3.75 in FY2022-23 to 1:2.40 in FY2023-24, a change of nearly 36% year on year.",
    "Section 12(A)(ii)(b) of the said Act, as amended in 2021, shall be read together with Rule 4-A of the 2019 Rules.",
    "Approximately 63,847 forms were processed, of which 1,209 were rejected for incomplete Annexure-II submissions.",
    "Coordinates 26°50'47\"N, 80°56'59\"E were recorded at 03:12:44 IST by device ID #A7-93/PL.",
  ],
  Story: [
    "The old lighthouse keeper had not received a letter in eleven years.",
    "Every evening he climbed the spiral stairs, lit the lamp, and watched the grey water fold over itself.",
    "One winter night a boat appeared, carrying a girl who claimed to be his granddaughter.",
    "Everything he believed about his own life quietly rearranged itself before the morning came.",
    "The train left at midnight with only three passengers and one very determined cat.",
    "In the last carriage sat a musician who had forgotten the name of his own song.",
    "The village had a rule: no one could tell a lie after the temple bell rang at dusk.",
    "A boy discovered a door in the orchard wall that opened onto a street from another century.",
    "She sold umbrellas in a town where it had not rained for nine years, and still she waited.",
    "The clockmaker repaired everything except the clock in his own kitchen, which stayed at ten past four.",
    "Letters kept arriving for a person who had never lived at that address.",
    "When the power failed, the whole street stepped outside and, for the first time, saw the stars together.",
    "He planted a tree for every mistake he made, and slowly a forest grew behind his house.",
    "The map was wrong in exactly one place, and that was the only place they needed to reach.",
    "An old radio in the attic played news bulletins from a war that had ended long ago.",
    "She wrote the last chapter first, so she would always know where she was going.",
  ],
  "Office Letter": [
    "With reference to your email dated 12 June 2024, we are pleased to confirm that your order has been processed and dispatched.",
    "The consignment is expected to reach your warehouse within five working days from the date of this letter.",
    "Kindly acknowledge receipt and inform us of any discrepancy within 48 hours of delivery.",
    "We regret the delay caused in responding to your earlier communication and appreciate your patience in this matter.",
    "Please find enclosed the revised quotation along with the updated terms of payment for your kind consideration.",
    "You are requested to depute a representative to collect the documents from our head office during working hours.",
    "This is to inform you that the annual maintenance contract will expire on 31 March and requires renewal.",
    "We look forward to a continued and mutually beneficial business relationship in the coming financial year.",
    "The meeting scheduled for Tuesday has been rescheduled to Thursday at 11:00 a.m. in the conference room.",
    "Kindly ensure that all pending invoices are submitted to the accounts department before the tenth of every month.",
    "Should you require any further clarification, please do not hesitate to contact the undersigned.",
    "Thank you for bringing this matter to our attention; corrective action has already been initiated.",
    "We confirm that the payment of the said amount has been credited to the account mentioned in your invoice.",
    "All employees are advised to complete the mandatory compliance training before the end of this quarter.",
    "This letter supersedes our earlier communication issued on the same subject last month.",
    "Yours sincerely, Operations Department, for and on behalf of the management.",
  ],
  "Government Letter": [
    "Subject: Implementation of revised guidelines regarding the computer typing test for direct recruitment.",
    "I am directed to refer to the subject cited above and to state that the competent authority has approved the revised standard.",
    "The qualifying speed shall be 35 words per minute in English and 30 words per minute in Hindi with effect from 01 July.",
    "All concerned offices are requested to ensure strict compliance and to acknowledge receipt of this communication.",
    "This issues with the approval of the competent authority and supersedes all earlier instructions on the subject.",
    "The undersigned is directed to forward herewith a copy of the notification for necessary action at your end.",
    "Heads of Departments are requested to give wide publicity to these instructions among all eligible candidates.",
    "Any representation received after the prescribed date shall not be entertained under any circumstances.",
    "The examination shall be conducted in two shifts under strict supervision of the appointed observers.",
    "A consolidated report in the prescribed proforma may kindly be furnished to this office within fifteen days.",
    "Expenditure on this account shall be debited to the head of account operative for the current financial year.",
    "The instructions contained herein shall apply mutatis mutandis to all subordinate offices of the Ministry.",
    "Candidates are advised to carry a valid photo identity card and the printed admit card to the examination centre.",
    "Non-compliance with these directions shall be viewed seriously and may invite disciplinary proceedings.",
    "This circular is available on the official website and may be downloaded for reference by all concerned.",
    "Sir/Madam, I am to invite your kind attention to this Department's earlier letter of even number.",
  ],
  Essay: [
    "Discipline is often mistaken for restriction, but it is in fact the foundation of freedom.",
    "A student who studies at a fixed hour each day gradually earns the ability to learn anything they choose.",
    "Discipline converts scattered effort into direction, and direction turns ambition into achievement over time.",
    "Technology has changed how we learn, but it has not changed the need for sustained attention.",
    "Education should teach a person how to think rather than merely what to remember for an examination.",
    "Curiosity is the engine of learning; grades are only the fuel gauge, and a poor one at that.",
    "A society grows great when people plant trees whose shade they know they will never sit in.",
    "Reading widely gives us borrowed experience, allowing us to live many lives within a single one.",
    "Failure is not the opposite of success; it is the raw material from which success is eventually built.",
    "Time is the only resource distributed equally, yet it is the one we account for least carefully.",
    "The internet has democratised information but has also made attention the scarcest human resource.",
    "Honest work done quietly usually outlasts loud promises made in public.",
    "Skill is what remains after motivation has faded and only routine is left standing.",
    "Communication is not what we say, but what the other person understands from what we said.",
    "The habit of finishing what we begin is more valuable than the talent to begin many things.",
    "A nation's real wealth lies in the skills of its citizens rather than in the size of its treasury.",
  ],
  News: [
    "The Department of Education announced on Thursday that digital literacy assessments will be introduced in 1,200 government schools.",
    "Officials said the programme will focus on keyboard proficiency, basic office software and safe internet practices.",
    "The scheme, with an outlay of Rs. 340 crore, will be rolled out from the next academic session.",
    "A senior official confirmed that training modules will be made available in both Hindi and English.",
    "Municipal authorities have begun repairs on the arterial road following complaints from local residents.",
    "The weather department has forecast moderate rainfall across the region for the next seventy-two hours.",
    "Stock markets closed higher on Friday, led by gains in information technology and banking shares.",
    "The state government has extended the deadline for online applications by two weeks due to technical issues.",
    "Railway officials said that four additional trains will operate during the festival season to manage extra passengers.",
    "A new public library will open next month and will include a dedicated computer training laboratory.",
    "The commission has invited objections from the public on the draft rules until the end of this month.",
    "According to the annual survey, digital skills among rural students improved by nearly nine per cent this year.",
    "Traffic diversions will remain in force from six in the morning until ten at night on the main corridor.",
    "The recruitment board clarified that the typing test will be conducted on standard computer keyboards only.",
    "Health authorities urged citizens to take basic precautions as seasonal cases continue to rise steadily.",
    "The minister inaugurated the skill development centre and interacted with students during the visit.",
  ],
  Computer: [
    "An operating system manages hardware resources and provides common services for application programs.",
    "It handles process scheduling, memory allocation, file systems, and device drivers in a coordinated manner.",
    "Without this abstraction layer, every application would need to talk directly to the hardware.",
    "Random access memory stores data temporarily while the processor performs calculations on it.",
    "A compiler translates human-readable source code into machine instructions the processor can execute.",
    "Cloud computing allows organisations to rent computing capacity instead of buying physical servers.",
    "Backups protect against data loss, but a backup that has never been restored is only a hopeful guess.",
    "A strong password combined with two-factor authentication dramatically reduces the risk of account theft.",
    "Databases use indexes to locate rows quickly, in much the same way a book uses its index.",
    "Networks transmit information in packets, each carrying a small portion of the original message.",
    "Version control systems record every change so that any earlier state of a project can be recovered.",
    "Caching stores frequently used results so that expensive work is not repeated unnecessarily.",
    "An algorithm is simply a precise sequence of steps that transforms an input into a desired output.",
    "Encryption converts readable data into an unreadable form that only an authorised key can reverse.",
    "Solid state drives have no moving parts, which makes them faster and more durable than older disks.",
    "Software testing does not prove the absence of bugs; it only reveals the presence of some of them.",
  ],
  Coding: [
    "function debounce(fn, delay = 300) {\n  let timer = null;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}",
    "const sum = (items) => items.reduce((total, item) => total + item.price * item.qty, 0);",
    "async function getUser(id) {\n  const res = await fetch(`/api/users/${id}`);\n  if (!res.ok) throw new Error('Request failed');\n  return res.json();\n}",
    "export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));",
    "for (let i = 0; i < matrix.length; i++) {\n  for (let j = 0; j < matrix[i].length; j++) {\n    total += matrix[i][j];\n  }\n}",
    "const grouped = rows.reduce((acc, row) => {\n  (acc[row.type] ||= []).push(row);\n  return acc;\n}, {});",
    "class Queue {\n  #items = [];\n  push(v) { this.#items.push(v); }\n  pop() { return this.#items.shift(); }\n}",
    "SELECT u.id, u.name, COUNT(o.id) AS orders\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nGROUP BY u.id, u.name\nHAVING COUNT(o.id) > 3;",
    "try {\n  const data = JSON.parse(raw);\n  render(data.items ?? []);\n} catch (err) {\n  console.error('Invalid JSON:', err.message);\n}",
    "const unique = [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));",
    "useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, [tick]);",
    "def binary_search(arr, target):\n    lo, hi = 0, len(arr) - 1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if arr[mid] == target:\n            return mid\n        if arr[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid - 1\n    return -1",
    "const router = express.Router();\nrouter.get('/health', (_req, res) => res.status(200).json({ ok: true }));",
    "type Result<T> = { ok: true; value: T } | { ok: false; error: string };",
    "git checkout -b feature/typing-lab && git commit -am \"add paper mode\" && git push -u origin HEAD",
    "const formatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total);",
  ],
  Legal: [
    "This Agreement shall be governed by and construed in accordance with the laws of India.",
    "The parties hereby submit to the exclusive jurisdiction of the competent courts at New Delhi.",
    "Any notice required hereunder shall be deemed duly served if sent by registered post or electronic mail.",
    "Neither party shall be liable for any failure to perform arising out of circumstances beyond its reasonable control.",
    "The Licensee shall not sublicense, assign or otherwise transfer its rights without prior written consent.",
    "This clause shall survive the termination or expiry of this Agreement for a period of three years.",
    "Time shall be of the essence in respect of all obligations relating to payment under this Agreement.",
    "The parties agree to attempt in good faith to resolve any dispute through mediation before initiating arbitration.",
    "Nothing in this Agreement shall be construed as creating a partnership or agency between the parties.",
    "The Confidential Information shall be used solely for the purpose contemplated under this Agreement.",
    "In the event of any inconsistency, the provisions of the main body shall prevail over the schedules.",
    "Each party represents and warrants that it has full power and authority to enter into this Agreement.",
    "Any amendment to this Agreement shall be valid only if made in writing and signed by both parties.",
    "The failure of either party to enforce any provision shall not constitute a waiver of that provision.",
    "The indemnifying party shall keep the other party indemnified against all claims, losses and reasonable costs.",
    "If any provision is held invalid, the remaining provisions shall continue in full force and effect.",
  ],
  Hindi: [
    "भारत एक विशाल और विविधताओं से भरा देश है, जहाँ अनेक भाषाएँ बोली जाती हैं।",
    "इस विविधता के बावजूद देश की एकता कभी कमजोर नहीं पड़ी।",
    "यहाँ के लोग एक-दूसरे की संस्कृति का सम्मान करना जानते हैं।",
    "कंप्यूटर पर हिंदी टाइपिंग सीखने के लिए नियमित अभ्यास सबसे महत्वपूर्ण है।",
    "प्रतिदिन बीस मिनट का अभ्यास कुछ ही महीनों में गति और शुद्धता दोनों में सुधार ला सकता है।",
    "सफलता का कोई छोटा रास्ता नहीं होता, परिश्रम ही एकमात्र मार्ग है।",
    "समय का सदुपयोग करने वाला व्यक्ति जीवन में कभी पीछे नहीं रहता।",
    "शिक्षा वह शक्ति है जो व्यक्ति को आत्मनिर्भर बनाती है।",
    "पुस्तकें हमारी सबसे अच्छी मित्र होती हैं क्योंकि वे कभी साथ नहीं छोड़तीं।",
    "स्वच्छता केवल एक आदत नहीं, बल्कि एक जिम्मेदारी भी है।",
    "किसान देश की रीढ़ है और उसकी मेहनत से ही अन्न के भंडार भरते हैं।",
    "इंटरनेट ने जानकारी को सबकी पहुँच में ला दिया है, पर विवेक अब भी आवश्यक है।",
    "जो विद्यार्थी अनुशासन का पालन करता है, वह परीक्षा में सदैव सफल होता है।",
    "हमें अपने पर्यावरण की रक्षा के लिए अधिक से अधिक वृक्ष लगाने चाहिए।",
    "सरकारी कार्यालयों में हिंदी टंकण की परीक्षा तीस शब्द प्रति मिनट की गति पर आधारित होती है।",
    "मातृभाषा में सोचने और लिखने से विचार अधिक स्पष्ट और प्रभावशाली बनते हैं।",
  ],
  English: [
    "Consistent practice is more valuable than occasional intensity in every skill worth learning.",
    "Twenty focused minutes each day build stronger muscle memory than three unfocused hours once a week.",
    "The brain consolidates motor patterns during rest between sessions rather than during the sessions themselves.",
    "Accuracy should always be trained before speed, because speed built on errors collapses under pressure.",
    "Keeping your eyes on the text instead of the keyboard is the single fastest way to improve.",
    "A relaxed hand travels faster than a tense one, even though it feels slower at first.",
    "Rhythm matters more than raw pace; steady typists finish ahead of erratic sprinters.",
    "Warm up with easy words for two minutes before attempting a difficult passage.",
    "Track your weekly average rather than your best score, because averages tell the truth.",
    "Punctuation and capitalisation deserve deliberate practice, not casual improvisation.",
    "If a particular key repeatedly fails you, isolate it and drill it until it stops being special.",
    "Ten minutes of deliberate practice outperforms an hour of distracted repetition.",
    "Typing is a physical skill, so sleep and rest affect your score more than most people expect.",
    "Set a target that is slightly uncomfortable but clearly reachable within a few weeks.",
    "Record your sessions occasionally; the patterns you notice will surprise you.",
    "Confidence in typing frees your attention for the thing that actually matters, which is thinking.",
  ],
  Mixed: [
    "The meeting is scheduled for 10:30 a.m. on 25-07-2024 in Room #402.",
    "कृपया समय पर उपस्थित हों और आवश्यक दस्तावेज़ साथ लाएँ।",
    "Please carry the revised report (v2.3), 4 printed copies & the signed annexure.",
    "Late entries will not be permitted after 10:45 a.m. under any circumstances.",
    "फॉर्म संख्या TM-000842 को 15/08/2024 तक जमा करना अनिवार्य है।",
    "Contact the helpdesk at support@example.com or dial +91-98765-43210 between 9 a.m. and 6 p.m.",
    "कुल राशि Rs. 1,25,000/- (एक लाख पच्चीस हजार रुपये मात्र) निर्धारित की गई है।",
    "Type the following: 50% of 1,240 = 620; verify & sign below.",
    "परीक्षा केंद्र पर मोबाइल फोन, स्मार्ट वॉच आदि पूर्णतः वर्जित हैं।",
    "Batch #17 starts on 01 Sep 2024; seats available: 25/40.",
    "उम्मीदवार को 35 w.p.m. की गति से टाइप करना आवश्यक है।",
    "Reference: ORD/2024/Q3-118 — dispatched via courier on 12.07.2024.",
    "नोट: गलत जानकारी देने पर आवेदन निरस्त कर दिया जाएगा।",
    "Login ID: user_2024 | Password must contain 8+ characters, 1 digit & 1 symbol.",
    "कार्यालय समय: प्रातः 9:30 से सायं 6:00 तक (शनिवार व रविवार अवकाश)।",
    "Total marks: 100 (Typing 60 + Accuracy 30 + Formatting 10).",
  ],
};

/** Legacy compatibility export: a ready-made paragraph bank per category. */
export const PARAGRAPH_BANK: Record<string, string[]> = Object.fromEntries(
  Object.entries(SENTENCE_POOLS).map(([cat, pool]) => {
    const size = cat === "Coding" ? 2 : 4;
    const out: string[] = [];
    for (let i = 0; i + size <= pool.length; i += size) {
      out.push(pool.slice(i, i + size).join(cat === "Coding" ? "\n\n" : " "));
    }
    return [cat, out];
  })
);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/**
 * Build a practice text of approximately `targetWords` words by sampling unique
 * sentences from the category pool. Sentences are reshuffled every pass, so two
 * consecutive calls almost never produce the same paragraph.
 */
export function buildParagraph(category: string, targetWords = 150, avoid: string[] = []): string {
  const pool = SENTENCE_POOLS[category] || SENTENCE_POOLS.Medium;
  const joiner = category === "Coding" ? "\n\n" : " ";
  const perParagraph = category === "Coding" ? 3 : 5;

  const paragraphs: string[] = [];
  let current: string[] = [];
  let words = 0;
  let guard = 0;

  while (words < targetWords && guard++ < 2000) {
    for (const sentence of shuffle(pool)) {
      current.push(sentence);
      words += wordCount(sentence);
      if (current.length >= perParagraph) {
        paragraphs.push(current.join(joiner));
        current = [];
      }
      if (words >= targetWords) break;
    }
  }
  if (current.length) paragraphs.push(current.join(joiner));

  const text = paragraphs.join("\n\n");
  // Avoid returning an identical text to something already used.
  if (avoid.includes(text) && targetWords > 0) return buildParagraph(category, targetWords, []);
  return text;
}

export function randomParagraph(category: string, avoid: string[] = []): string {
  return buildParagraph(category, 120, avoid);
}
