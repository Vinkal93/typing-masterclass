export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  keywords: string[];
  date: string;
  readTime: string;
  faq: { question: string; answer: string }[];
  relatedSlugs: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-increase-typing-speed",
    title: "How to Increase Typing Speed – 10 Proven Tips",
    description: "Learn how to increase your typing speed with simple practice methods, keyboard techniques and daily typing exercises. Go from 30 WPM to 80+ WPM.",
    category: "Tips & Tricks",
    keywords: ["increase typing speed", "typing speed tips", "typing practice tips", "improve typing speed fast"],
    date: "2025-12-15",
    readTime: "8 min read",
    content: `
## Why Typing Speed Matters

In today's digital world, typing speed directly impacts your productivity. Whether you're a student, professional, or preparing for government exams, faster typing means faster work completion.

## 10 Proven Tips to Increase Typing Speed

### 1. Learn Proper Finger Placement
Place your fingers on the home row keys: **A S D F** for the left hand and **J K L ;** for the right hand. Your thumbs should rest on the space bar. This is the foundation of touch typing.

### 2. Don't Look at the Keyboard
Train yourself to type without looking at the keyboard. This is called touch typing. It may feel slow initially, but within 2 weeks of practice, you'll type faster than before.

### 3. Practice Daily for 15-30 Minutes
Consistency beats intensity. Practice typing for at least 15-30 minutes every day. Use typing test websites to track your progress and identify weak areas.

### 4. Focus on Accuracy First
Speed comes naturally when you type accurately. If you make many errors, slow down and focus on hitting the right keys. Speed will follow accuracy.

### 5. Use Online Typing Tests
Take regular typing tests to measure your WPM and track improvement. Start with 1-minute tests and gradually move to 5-minute tests for stamina building.

### 6. Practice with Different Text Types
Don't just practice the same text repeatedly. Use diverse paragraphs covering technology, literature, science, and current affairs to build vocabulary and adaptability.

### 7. Maintain Proper Posture
Sit upright with your feet flat on the floor. Keep your wrists slightly elevated above the keyboard. Good posture reduces fatigue and prevents repetitive strain injuries.

### 8. Use All 10 Fingers
Many people type using only 2-4 fingers. Learning to use all 10 fingers distributes the workload and significantly increases typing speed.

### 9. Learn Keyboard Shortcuts
Knowing keyboard shortcuts for common tasks (Ctrl+C, Ctrl+V, Ctrl+Z) reduces reliance on the mouse and speeds up overall computer usage.

### 10. Set Goals and Track Progress
Set weekly WPM goals and track your progress. Start with a realistic target like increasing 5 WPM per week. Celebrate small milestones to stay motivated.

## How Long Does It Take to Improve?

Most people see significant improvement within 2-4 weeks of daily practice. Going from 30 WPM to 50 WPM typically takes 2 weeks. Reaching 70+ WPM may take 1-3 months of consistent practice.
    `,
    faq: [
      { question: "How fast should I be able to type?", answer: "The average typing speed is 40 WPM. A good speed is 60-80 WPM. Professional typists reach 80-100+ WPM." },
      { question: "Can I learn touch typing in a week?", answer: "You can learn the basics in a week, but it takes 2-4 weeks of daily practice to become comfortable and see speed improvements." },
      { question: "Does typing speed matter for government exams?", answer: "Yes, many government exams like CPCT, SSC, and court typist positions require minimum typing speeds of 30-40 WPM." },
    ],
    relatedSlugs: ["typing-practice-paragraphs-for-beginners", "keyboard-finger-placement-guide"],
  },
  {
    slug: "typing-practice-paragraphs-for-beginners",
    title: "Typing Practice Paragraphs for Beginners – Easy to Hard",
    description: "Practice typing with carefully curated paragraphs for beginners. Start with simple sentences and progress to complex paragraphs.",
    category: "Practice",
    keywords: ["typing practice paragraphs", "typing paragraphs for beginners", "typing practice text", "easy typing paragraphs"],
    date: "2025-12-10",
    readTime: "6 min read",
    content: `
## Start Your Typing Journey

Typing practice paragraphs are the most effective way to improve your typing skills. Below you'll find paragraphs organized from easy to hard, designed to progressively challenge your typing abilities.

## Beginner Level Paragraphs

Start with short, simple sentences that use common words. Focus on accuracy rather than speed at this stage.

**Paragraph 1:** The cat sat on the mat. The dog ran in the park. The sun is bright today. Birds fly in the sky.

**Paragraph 2:** I like to read books. She went to the store. They played in the garden. We ate lunch together.

## Intermediate Level Paragraphs

Once comfortable with basic sentences, move to longer paragraphs with varied vocabulary.

## Advanced Level Paragraphs

Challenge yourself with complex sentences, technical vocabulary, and longer text passages.

## Tips for Using Practice Paragraphs

1. Read the paragraph once before typing
2. Set a timer and type at your comfortable speed
3. Review your errors after each session
4. Repeat difficult paragraphs until you achieve 95%+ accuracy
5. Gradually increase your target WPM
    `,
    faq: [
      { question: "What are the best paragraphs for typing practice?", answer: "Use diverse paragraphs covering different topics. Start with simple everyday sentences and gradually move to technical or literary text." },
      { question: "How many paragraphs should I practice daily?", answer: "Practice 5-10 paragraphs daily for 15-30 minutes. Quality practice with focus on accuracy is more important than quantity." },
    ],
    relatedSlugs: ["how-to-increase-typing-speed", "best-typing-practice-exercises"],
  },
  {
    slug: "ssc-typing-test-practice",
    title: "SSC Typing Test Practice – Tips, Speed Requirements & Mock Tests",
    description: "Complete guide to SSC typing test preparation. Learn speed requirements, practice tips, and take mock tests for SSC CGL, CHSL, and other exams.",
    category: "Exam Prep",
    keywords: ["SSC typing test", "SSC typing test practice", "SSC CGL typing test", "SSC CHSL typing test"],
    date: "2025-12-05",
    readTime: "7 min read",
    content: `
## SSC Typing Test Overview

The Staff Selection Commission (SSC) conducts typing tests for various positions including CGL, CHSL, and Stenographer posts. Understanding the requirements and practicing effectively is crucial for success.

## SSC Typing Speed Requirements

- **SSC CGL**: 35 WPM in English / 30 WPM in Hindi
- **SSC CHSL**: 35 WPM in English (DEO) / 25 WPM in English (LDC)
- **SSC Stenographer**: 80/100 WPM shorthand + typing test

## How to Prepare for SSC Typing Test

### 1. Know the Exam Pattern
SSC typing tests typically last 10-15 minutes. You need to type a given passage within the time limit with acceptable accuracy.

### 2. Practice with Similar Paragraphs
Use paragraphs similar to SSC exam patterns—government reports, policy documents, and general knowledge topics.

### 3. Build Stamina
SSC tests are longer than practice tests. Build your stamina by practicing 10-15 minute typing sessions regularly.

### 4. Minimize Errors
SSC tests deduct marks for errors. Focus on clean, accurate typing rather than raw speed.
    `,
    faq: [
      { question: "What is the minimum typing speed for SSC?", answer: "SSC CGL requires 35 WPM in English or 30 WPM in Hindi. SSC CHSL requires 25-35 WPM depending on the post." },
      { question: "Is backspace allowed in SSC typing test?", answer: "Yes, backspace is generally allowed in SSC typing tests. However, excessive corrections waste time." },
    ],
    relatedSlugs: ["how-to-increase-typing-speed", "hindi-typing-test-practice"],
  },
  {
    slug: "hindi-typing-test-practice",
    title: "Hindi Typing Test Practice – Krutidev & Mangal Font Guide",
    description: "Complete guide to Hindi typing test practice. Learn Krutidev and Mangal font layouts with practice exercises for CPCT and government exams.",
    category: "Hindi Typing",
    keywords: ["hindi typing test practice", "hindi typing krutidev", "mangal typing practice", "CPCT typing test"],
    date: "2025-12-01",
    readTime: "9 min read",
    content: `
## Hindi Typing for Government Exams

Hindi typing proficiency is mandatory for many government positions in India. The two most common font layouts are Krutidev and Mangal (Unicode).

## Krutidev Font Layout

Krutidev uses a phonetic layout that maps Hindi characters to English keyboard keys. It's widely used in state government exams of Madhya Pradesh, Rajasthan, and Uttar Pradesh.

### Key Krutidev Mappings
- 'k' → 'क', 'K' → 'ख'
- 'x' → 'ग', 'X' → 'घ'
- Learning the full layout takes 2-3 weeks of dedicated practice.

## Mangal Font (Unicode)

Mangal uses the Inscript keyboard layout, which is the standard Unicode layout for Hindi typing. It's used in SSC, IBPS, and central government exams.

## Practice Strategy

1. Learn one layout at a time
2. Practice basic characters first (consonants, then vowels)
3. Move to words, then sentences, then paragraphs
4. Take timed tests to build speed
5. Use our Hindi typing test tool for daily practice
    `,
    faq: [
      { question: "Which is easier—Krutidev or Mangal?", answer: "Krutidev is generally considered easier to learn as it has a more intuitive layout. However, Mangal (Inscript) is the official standard." },
      { question: "What speed is needed for CPCT Hindi typing?", answer: "CPCT requires 30 WPM in Hindi typing with at least 90% accuracy." },
    ],
    relatedSlugs: ["ssc-typing-test-practice", "how-to-increase-typing-speed"],
  },
  {
    slug: "best-typing-practice-exercises",
    title: "Best Typing Practice Exercises for Speed & Accuracy",
    description: "Discover the best typing practice exercises to improve your speed and accuracy. From home row drills to paragraph typing.",
    category: "Practice",
    keywords: ["typing practice exercises", "best typing exercises", "typing drills", "touch typing practice"],
    date: "2025-11-25",
    readTime: "6 min read",
    content: `
## Essential Typing Exercises

Structured typing exercises target specific skills and help you improve systematically.

## Exercise 1: Home Row Drills
Practice typing only home row keys (ASDF JKL;) until you can type them without looking. This builds the foundation for touch typing.

## Exercise 2: Letter Combination Drills
Practice common letter combinations: th, er, on, an, in, he, re. These appear frequently in English text.

## Exercise 3: Word Repetition
Type common words repeatedly: the, and, for, are, but, not, you, all. Speed comes from recognizing and typing frequent words automatically.

## Exercise 4: Sentence Typing
Type complete sentences focusing on rhythm and flow. Don't stop between words—maintain a steady pace.

## Exercise 5: Paragraph Challenge
Type full paragraphs against a timer. Start with 1 minute and gradually increase to 5 minutes.
    `,
    faq: [
      { question: "How long should I practice typing each day?", answer: "15-30 minutes of focused practice daily is ideal. Consistency matters more than duration." },
      { question: "What's the fastest way to learn touch typing?", answer: "Start with home row drills, practice daily for 20 minutes, and use a structured typing course. Most people become comfortable in 2-3 weeks." },
    ],
    relatedSlugs: ["how-to-increase-typing-speed", "typing-practice-paragraphs-for-beginners"],
  },
  {
    slug: "keyboard-finger-placement-guide",
    title: "Keyboard Finger Placement Guide – Touch Typing Basics",
    description: "Learn proper keyboard finger placement for touch typing. Complete guide with diagrams showing which finger presses which key.",
    category: "Guides",
    keywords: ["keyboard finger placement", "touch typing finger position", "typing finger guide", "home row typing"],
    date: "2025-11-20",
    readTime: "5 min read",
    content: `
## Proper Finger Placement

The foundation of fast, accurate typing is correct finger placement on the keyboard.

## Home Row Position

Your fingers should always return to the home row after pressing any key:
- **Left Pinky**: A
- **Left Ring**: S
- **Left Middle**: D
- **Left Index**: F (has a bump for tactile reference)
- **Right Index**: J (has a bump for tactile reference)
- **Right Middle**: K
- **Right Ring**: L
- **Right Pinky**: ;
- **Thumbs**: Space bar

## Which Finger for Which Key?

Each finger is responsible for specific keys. The index fingers cover the most keys (their home key plus adjacent columns), while the pinky covers the outer columns.

## Practice Drill

Start by closing your eyes and finding the F and J keys using the bumps. Place all fingers on the home row and practice typing each key's assigned letters.
    `,
    faq: [
      { question: "Why do F and J keys have bumps?", answer: "The bumps on F and J keys help you find the home row position without looking at the keyboard. Your index fingers should always rest on these keys." },
      { question: "Should I use my pinky finger for typing?", answer: "Yes! Using all 10 fingers including pinkies distributes the workload and significantly increases typing speed." },
    ],
    relatedSlugs: ["how-to-increase-typing-speed", "best-typing-practice-exercises"],
  },
];

export const getBlogPost = (slug: string): BlogPost | undefined => {
  return blogPosts.find(p => p.slug === slug);
};

export const getRelatedPosts = (post: BlogPost): BlogPost[] => {
  return post.relatedSlugs.map(s => blogPosts.find(p => p.slug === s)).filter(Boolean) as BlogPost[];
};

export const getBlogCategories = (): string[] => {
  return [...new Set(blogPosts.map(p => p.category))];
};
