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

Typing practice paragraphs are the most effective way to improve your typing skills. Below you'll find paragraphs organized from easy to hard.

## Beginner Level Paragraphs

**Paragraph 1:** The cat sat on the mat. The dog ran in the park. The sun is bright today.

**Paragraph 2:** I like to read books. She went to the store. They played in the garden.

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
      { question: "How many paragraphs should I practice daily?", answer: "Practice 5-10 paragraphs daily for 15-30 minutes." },
    ],
    relatedSlugs: ["how-to-increase-typing-speed", "best-typing-practice-exercises"],
  },
  {
    slug: "ssc-typing-test-practice",
    title: "SSC Typing Test Practice – Tips, Speed Requirements & Mock Tests",
    description: "Complete guide to SSC typing test preparation with speed requirements and practice tips.",
    category: "Exam Prep",
    keywords: ["SSC typing test", "SSC typing test practice", "SSC CGL typing test"],
    date: "2025-12-05",
    readTime: "7 min read",
    content: `
## SSC Typing Test Overview

The Staff Selection Commission (SSC) conducts typing tests for CGL, CHSL, and Stenographer posts.

## SSC Typing Speed Requirements

- **SSC CGL**: 35 WPM in English / 30 WPM in Hindi
- **SSC CHSL**: 35 WPM in English (DEO) / 25 WPM in English (LDC)
- **SSC Stenographer**: 80/100 WPM shorthand + typing test

## How to Prepare

### 1. Know the Exam Pattern
SSC typing tests typically last 10-15 minutes.

### 2. Practice with Similar Paragraphs
Use paragraphs similar to SSC exam patterns.

### 3. Build Stamina
Build your stamina by practicing 10-15 minute typing sessions regularly.

### 4. Minimize Errors
SSC tests deduct marks for errors. Focus on clean, accurate typing.
    `,
    faq: [
      { question: "What is the minimum typing speed for SSC?", answer: "SSC CGL requires 35 WPM in English or 30 WPM in Hindi." },
      { question: "Is backspace allowed in SSC typing test?", answer: "Yes, backspace is generally allowed." },
    ],
    relatedSlugs: ["how-to-increase-typing-speed", "hindi-typing-test-practice"],
  },
  {
    slug: "hindi-typing-test-practice",
    title: "Hindi Typing Test Practice – Krutidev & Mangal Font Guide",
    description: "Complete guide to Hindi typing test practice with Krutidev and Mangal font layouts.",
    category: "Hindi Typing",
    keywords: ["hindi typing test practice", "hindi typing krutidev", "mangal typing practice"],
    date: "2025-12-01",
    readTime: "9 min read",
    content: `
## Hindi Typing for Government Exams

Hindi typing proficiency is mandatory for many government positions in India.

## Krutidev Font Layout

Krutidev uses a phonetic layout. It's widely used in MP, Rajasthan, and UP government exams.

## Mangal Font (Unicode)

Mangal uses the Inscript keyboard layout, used in SSC, IBPS, and central government exams.

## Practice Strategy

1. Learn one layout at a time
2. Practice basic characters first
3. Move to words, then sentences, then paragraphs
4. Take timed tests to build speed
    `,
    faq: [
      { question: "Which is easier—Krutidev or Mangal?", answer: "Krutidev is generally considered easier to learn." },
      { question: "What speed is needed for CPCT Hindi typing?", answer: "CPCT requires 30 WPM in Hindi with at least 90% accuracy." },
    ],
    relatedSlugs: ["ssc-typing-test-practice", "how-to-increase-typing-speed"],
  },
  {
    slug: "best-typing-practice-exercises",
    title: "Best Typing Practice Exercises for Speed & Accuracy",
    description: "Discover the best typing practice exercises to improve your speed and accuracy.",
    category: "Practice",
    keywords: ["typing practice exercises", "best typing exercises", "typing drills"],
    date: "2025-11-25",
    readTime: "6 min read",
    content: `
## Essential Typing Exercises

Structured typing exercises target specific skills.

## Exercise 1: Home Row Drills
Practice typing only home row keys (ASDF JKL;).

## Exercise 2: Letter Combination Drills
Practice common letter combinations: th, er, on, an, in, he, re.

## Exercise 3: Word Repetition
Type common words repeatedly: the, and, for, are, but, not.

## Exercise 4: Sentence Typing
Type complete sentences focusing on rhythm and flow.

## Exercise 5: Paragraph Challenge
Type full paragraphs against a timer.
    `,
    faq: [
      { question: "How long should I practice typing each day?", answer: "15-30 minutes of focused practice daily is ideal." },
      { question: "What's the fastest way to learn touch typing?", answer: "Start with home row drills, practice daily for 20 minutes." },
    ],
    relatedSlugs: ["how-to-increase-typing-speed", "typing-practice-paragraphs-for-beginners"],
  },
  {
    slug: "keyboard-finger-placement-guide",
    title: "Keyboard Finger Placement Guide – Touch Typing Basics",
    description: "Learn proper keyboard finger placement for touch typing with complete guide.",
    category: "Guides",
    keywords: ["keyboard finger placement", "touch typing finger position", "home row typing"],
    date: "2025-11-20",
    readTime: "5 min read",
    content: `
## Proper Finger Placement

The foundation of fast, accurate typing is correct finger placement.

## Home Row Position

- **Left Pinky**: A | **Left Ring**: S | **Left Middle**: D | **Left Index**: F
- **Right Index**: J | **Right Middle**: K | **Right Ring**: L | **Right Pinky**: ;
- **Thumbs**: Space bar

## Which Finger for Which Key?

Each finger is responsible for specific keys. The index fingers cover the most keys.

## Practice Drill

Close your eyes and find the F and J keys using the bumps. Place all fingers on the home row.
    `,
    faq: [
      { question: "Why do F and J keys have bumps?", answer: "The bumps help you find the home row position without looking at the keyboard." },
      { question: "Should I use my pinky finger for typing?", answer: "Yes! Using all 10 fingers increases typing speed significantly." },
    ],
    relatedSlugs: ["how-to-increase-typing-speed", "best-typing-practice-exercises"],
  },
  {
    slug: "typing-certificate-guide",
    title: "How to Get a Typing Certificate Online – Complete Guide",
    description: "Learn how to get a typing speed certificate online for government jobs, interviews, and skill verification.",
    category: "Guides",
    keywords: ["typing certificate online", "typing speed certificate", "typing test certificate", "online typing certificate"],
    date: "2025-12-20",
    readTime: "7 min read",
    content: `
## Why Do You Need a Typing Certificate?

A typing certificate is official proof of your typing speed and accuracy. It is required for many government jobs, data entry positions, and clerical roles in India.

## Where is a Typing Certificate Required?

- **SSC Exams** – CGL, CHSL, Stenographer posts
- **State Government Jobs** – Court typist, data entry operator
- **CPCT Certification** – Required for MP government positions
- **Private Sector** – Data entry, transcription, content writing roles
- **Freelancing** – Proof of skills for online freelancing platforms

## How to Get a Typing Certificate

### Step 1: Practice and Improve Your Speed
Before getting certified, ensure your typing speed meets the required standards. Most government exams require 30-40 WPM.

### Step 2: Take a Certified Typing Test
You can take typing tests from recognized platforms or government-approved centers.

### Step 3: Generate Your Certificate
Many online platforms, including TypeMaster, allow you to generate a typing speed certificate after completing a test with verified results.

## Tips for Scoring High on Certification Tests

1. Practice with the same test duration you'll face (usually 10-15 minutes)
2. Focus on accuracy – most tests penalize errors
3. Practice with official exam-style paragraphs
4. Take mock tests under exam conditions
5. Ensure your keyboard is comfortable and responsive

## CPCT Certificate Guide

The Computer Proficiency and Certification Test (CPCT) is conducted by the Madhya Pradesh government. It tests both computer knowledge and typing proficiency. Requirements:
- English typing: 35 WPM
- Hindi typing: 30 WPM
- Accuracy: 90% or above
    `,
    faq: [
      { question: "Is an online typing certificate valid for government jobs?", answer: "It depends on the specific job requirement. Some accept online certificates, while others require certificates from recognized testing centers like CPCT." },
      { question: "What typing speed is needed for a certificate?", answer: "Most certificates require a minimum of 30-35 WPM with at least 90% accuracy." },
      { question: "Can I generate a free typing certificate?", answer: "Yes, TypeMaster allows you to generate a free typing speed certificate after completing a test." },
    ],
    relatedSlugs: ["ssc-typing-test-practice", "how-to-increase-typing-speed"],
  },
  {
    slug: "cpct-exam-tips-preparation-guide",
    title: "CPCT Exam Tips & Preparation Guide – Score High in 2025",
    description: "Complete CPCT exam preparation guide with typing tips, syllabus, previous papers and strategies to score high.",
    category: "Exam Prep",
    keywords: ["CPCT exam tips", "CPCT preparation guide", "CPCT typing test", "CPCT exam 2025", "CPCT mock test"],
    date: "2025-12-22",
    readTime: "10 min read",
    content: `
## What is CPCT?

CPCT (Computer Proficiency and Certification Test) is an examination conducted by the Madhya Pradesh Agency for Promotion of Information Technology (MAP_IT). It is mandatory for candidates applying for government positions requiring computer proficiency.

## CPCT Exam Pattern

The CPCT exam has two sections:

### Section 1: Computer Knowledge (MCQs)
- 75 questions in 75 minutes
- Topics: Computer basics, MS Office, Internet, operating systems
- Negative marking: 1/3 mark deduction per wrong answer

### Section 2: Typing Test
- English typing: 10 minutes (35 WPM required)
- Hindi typing: 10 minutes (30 WPM required)
- Accuracy must be 90% or above

## CPCT Preparation Strategy

### For Computer Knowledge Section
1. **Study the syllabus thoroughly** – Focus on MS Word, Excel, PowerPoint basics
2. **Practice previous year papers** – Understanding the question pattern is crucial
3. **Learn keyboard shortcuts** – Questions on shortcuts are common
4. **Understand networking basics** – IP addresses, protocols, internet concepts
5. **Know about operating systems** – Windows features, file management

### For Typing Test Section
1. **Daily practice of 30-60 minutes** – Consistency is key
2. **Practice with CPCT-style paragraphs** – Government documents, policy texts
3. **Build stamina** – CPCT typing tests last 10 minutes, much longer than practice sessions
4. **Track accuracy separately** – You need 90%+ accuracy
5. **Use TypeMaster's CPCT Mock Test** – Our mock tests simulate exact exam conditions

## Common Mistakes to Avoid

- Don't rush for speed at the cost of accuracy
- Don't skip the computer knowledge section preparation
- Don't rely on two-finger typing – learn proper finger placement
- Don't ignore Hindi typing if you need it
- Don't take the test without sufficient mock practice

## CPCT Score Calculation

Your CPCT score is calculated as:
- Computer Knowledge: Maximum 75 marks
- Typing Speed: Marks based on WPM achieved
- Overall score determines your ranking

## Resources for CPCT Preparation

- TypeMaster CPCT Mock Tests (free)
- Previous year CPCT question papers
- Official MAP_IT website for syllabus updates
- Hindi typing practice with Krutidev/Mangal layouts
    `,
    faq: [
      { question: "How many times can I attempt CPCT?", answer: "There is no limit. You can attempt CPCT as many times as you want. The best score is considered valid for 2 years." },
      { question: "Is CPCT certificate valid for all government jobs in MP?", answer: "CPCT is mandatory for most government positions in Madhya Pradesh that require computer proficiency." },
      { question: "What is the passing score for CPCT?", answer: "There is no fixed passing score. Your score is ranked and validity depends on the specific job requirement." },
      { question: "How to prepare for CPCT in 30 days?", answer: "Dedicate 1 hour daily to computer knowledge MCQs and 1 hour to typing practice. Take mock tests every 3 days." },
    ],
    relatedSlugs: ["typing-certificate-guide", "hindi-typing-test-practice", "ssc-typing-test-practice"],
  },
  {
    slug: "keyboard-shortcuts-complete-guide",
    title: "Essential Keyboard Shortcuts – Complete Guide for Faster Computing",
    description: "Master essential keyboard shortcuts for Windows, Mac, Chrome, and popular applications to boost productivity.",
    category: "Guides",
    keywords: ["keyboard shortcuts", "keyboard shortcuts guide", "windows keyboard shortcuts", "essential keyboard shortcuts"],
    date: "2025-12-25",
    readTime: "8 min read",
    content: `
## Why Learn Keyboard Shortcuts?

Keyboard shortcuts can save you 8+ days of work per year. They reduce mouse dependency, increase productivity, and make you a more efficient computer user.

## Essential Windows Shortcuts

### Basic Operations
- **Ctrl + C** – Copy selected text or file
- **Ctrl + V** – Paste
- **Ctrl + X** – Cut
- **Ctrl + Z** – Undo last action
- **Ctrl + Y** – Redo
- **Ctrl + A** – Select all
- **Ctrl + S** – Save current file
- **Ctrl + P** – Print

### Window Management
- **Alt + Tab** – Switch between open windows
- **Win + D** – Show/hide desktop
- **Win + L** – Lock computer
- **Win + E** – Open File Explorer
- **Alt + F4** – Close current window
- **Win + Arrow Keys** – Snap windows to sides

### Text Editing
- **Ctrl + B** – Bold text
- **Ctrl + I** – Italic text
- **Ctrl + U** – Underline text
- **Home** – Go to beginning of line
- **End** – Go to end of line
- **Ctrl + Home** – Go to beginning of document
- **Ctrl + End** – Go to end of document

## Browser Shortcuts (Chrome/Edge/Firefox)

- **Ctrl + T** – New tab
- **Ctrl + W** – Close current tab
- **Ctrl + Shift + T** – Reopen closed tab
- **Ctrl + L** – Focus address bar
- **Ctrl + F** – Find on page
- **Ctrl + D** – Bookmark current page
- **F5** – Refresh page
- **Ctrl + Shift + N** – Incognito/private window

## MS Word Shortcuts

- **Ctrl + N** – New document
- **Ctrl + O** – Open document
- **Ctrl + F** – Find and replace
- **Ctrl + H** – Find and replace dialog
- **Ctrl + Shift + L** – Bullet list
- **Ctrl + 1** – Single line spacing
- **Ctrl + 2** – Double line spacing

## MS Excel Shortcuts

- **Ctrl + ;** – Insert today's date
- **F2** – Edit cell
- **Ctrl + Shift + L** – Toggle filters
- **Alt + =** – Auto sum
- **Ctrl + Space** – Select entire column
- **Shift + Space** – Select entire row

## How Keyboard Shortcuts Improve Typing

Learning shortcuts is directly related to typing proficiency. As you become more comfortable with the keyboard through typing practice, using shortcuts becomes natural. Professional typists who know shortcuts are significantly more productive than those who rely on the mouse for everything.

## Tips for Learning Shortcuts

1. **Start with 5 shortcuts** – Don't overwhelm yourself
2. **Use them daily** – Force yourself to use shortcuts instead of the mouse
3. **Print a cheat sheet** – Keep it near your desk for reference
4. **Practice in context** – Learn shortcuts for the applications you use most
5. **Build gradually** – Add 2-3 new shortcuts each week
    `,
    faq: [
      { question: "How many keyboard shortcuts should I learn?", answer: "Start with 10-15 essential shortcuts (copy, paste, undo, save, etc.) and gradually expand as they become muscle memory." },
      { question: "Do keyboard shortcuts work the same on Mac?", answer: "Most shortcuts are similar but use Cmd instead of Ctrl on Mac. For example, Cmd+C for copy instead of Ctrl+C." },
      { question: "Can keyboard shortcuts improve my typing speed?", answer: "Yes! Using shortcuts reduces mouse dependency and keeps your hands on the keyboard, which reinforces typing muscle memory." },
    ],
    relatedSlugs: ["keyboard-finger-placement-guide", "how-to-increase-typing-speed", "best-typing-practice-exercises"],
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
