// Extends a short exam paragraph into a long (1000+ word) passage so the
// timer runs out before the text does. Uses deterministic-but-varied
// sentence reshuffling + connector phrases so it never feels like a
// literal repeat of the same block.

const EN_CONNECTORS = [
  "Furthermore,",
  "In addition,",
  "Moreover,",
  "Consequently,",
  "As a result,",
  "It is also important to note that",
  "In this context,",
  "Beyond that,",
  "At the same time,",
  "In practical terms,",
  "From a broader perspective,",
  "To elaborate further,",
  "Similarly,",
  "On the same note,",
  "Additionally,",
];

const HI_CONNECTORS = [
  "इसके अतिरिक्त,",
  "इसके अलावा,",
  "साथ ही,",
  "इसी क्रम में,",
  "व्यावहारिक दृष्टि से,",
  "एक व्यापक दृष्टिकोण से,",
  "इस संदर्भ में,",
  "परिणामस्वरूप,",
  "इसी प्रकार,",
  "यह भी उल्लेखनीय है कि",
  "आगे बढ़ते हुए,",
  "इसी बीच,",
];

const EN_FILLERS = [
  "Candidates preparing for competitive typing examinations must dedicate consistent hours of practice every single day, focusing equally on speed and accuracy.",
  "The examination pattern rewards typists who maintain steady rhythm rather than short bursts of speed followed by long pauses.",
  "Government departments across the country continue to recruit skilled typists for stenographic, clerical and data entry positions of national importance.",
  "Regular finger exercises, correct posture, and adherence to the touch typing method significantly reduce errors during long duration tests.",
  "Aspirants should attempt at least three full length mock tests every week under strict examination conditions to build genuine endurance.",
  "The syllabus prescribed by the commission covers general awareness, quantitative aptitude, reasoning and a mandatory typing skill test with a fixed passing criterion.",
  "Time management remains a critical factor since a single lost minute can reduce the final word count by an entire block of sentences.",
  "Officers evaluating the answer sheets look for uniformity in output, minimum backspace usage, and near perfect punctuation throughout the passage.",
];

const HI_FILLERS = [
  "प्रतियोगी टाइपिंग परीक्षाओं की तैयारी करने वाले उम्मीदवारों को प्रतिदिन लगातार अभ्यास करना चाहिए तथा गति और सटीकता दोनों पर समान ध्यान देना चाहिए।",
  "परीक्षा का प्रारूप उन्हीं टाइपिस्टों को पुरस्कृत करता है जो लंबे विराम के बजाय स्थिर लय बनाए रखते हैं।",
  "देश भर के सरकारी विभाग आशुलिपिक, लिपिकीय एवं डेटा प्रविष्टि पदों के लिए कुशल टाइपिस्टों की भर्ती करते रहते हैं।",
  "नियमित अंगुली व्यायाम, सही मुद्रा तथा टच टाइपिंग पद्धति का पालन लंबी अवधि की परीक्षा में त्रुटियों को कम करते हैं।",
  "अभ्यर्थियों को सप्ताह में कम से कम तीन पूर्ण मॉक टेस्ट कठोर परीक्षा परिस्थितियों में देने चाहिए ताकि वास्तविक सहनशक्ति विकसित हो सके।",
  "आयोग द्वारा निर्धारित पाठ्यक्रम में सामान्य ज्ञान, संख्यात्मक अभिरुचि, तर्कशक्ति तथा अनिवार्य टाइपिंग कौशल परीक्षण शामिल हैं।",
  "समय प्रबंधन एक महत्वपूर्ण कारक है क्योंकि एक मिनट का नुकसान अंतिम शब्द गणना को कम कर सकता है।",
];

function splitSentences(text: string, isHindi: boolean): string[] {
  const separator = isHindi ? /(?<=।)\s+/g : /(?<=[.!?])\s+/g;
  return text
    .split(separator)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Extend `base` to at least `minWords` words, blending original sentences
 * with connectors and filler passages so it stays exam-relevant and natural.
 */
export function extendExamText(
  base: string,
  isHindi: boolean,
  minWords = 1200
): string {
  const connectors = isHindi ? HI_CONNECTORS : EN_CONNECTORS;
  const fillers = isHindi ? HI_FILLERS : EN_FILLERS;
  const sentences = splitSentences(base, isHindi);
  if (sentences.length === 0) return base;

  const out: string[] = [base.trim()];
  let words = wordCount(base);
  let round = 1;

  while (words < minWords) {
    const shuffled = seededShuffle(sentences, round * 7);
    for (let i = 0; i < shuffled.length && words < minWords; i++) {
      const conn = connectors[(round + i) % connectors.length];
      const filler =
        i % 2 === 0 ? fillers[(round + i) % fillers.length] : "";
      const chunk = filler
        ? `${conn} ${shuffled[i]} ${filler}`
        : `${conn} ${shuffled[i]}`;
      out.push(chunk);
      words += wordCount(chunk);
    }
    round++;
    if (round > 30) break; // safety
  }

  return out.join(" ");
}
