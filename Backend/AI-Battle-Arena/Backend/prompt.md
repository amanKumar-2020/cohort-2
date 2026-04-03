Design a modern desktop web application UI for an AI chat system called "Code Battle".

✨ Core Concept:
The user submits a programming problem, and the system returns:
1. Two AI-generated solutions
2. A judge evaluation comparing both solutions
3. A recommendation of the better solution

---

🎯 Layout (Desktop-first, clean & professional):

🔹 Top Section (Header)
- App name: "Alita Battle Arena"
- Minimal navbar (optional: history, settings)
- Dark theme preferred (modern dev style)

---

🔹 Left Panel (Input Area)
- Large textarea for user input:
  Placeholder: "Enter your coding problem..."
- Submit button: "Start Battle ⚔️"
- Show loading state when request is processing

---

🔹 Main Content Area (Right Side)

After API response, show:

📌 Problem Section (Top Card)
- Display the submitted problem clearly

---

⚔️ Battle Section (Two Columns Side-by-Side)

🟦 Solution 1 (Left Card)
- Title: "Solution 1"
- Scrollable code/content block
- Proper formatting (Markdown + code highlighting)

🟩 Solution 2 (Right Card)
- Title: "Solution 2"
- Same structure as Solution 1

---

🏆 Judge Panel (Below Both Solutions)

- Title: "Judge Analysis"

Show:
- Score:
  - Solution 1 Score (e.g., 92)
  - Solution 2 Score (e.g., 85)

- Reasoning:
  - Why Solution 1 is good
  - Why Solution 2 is good

- Final Recommendation:
  - Highlight winning solution clearly
  - Example: "🏆 Solution 1 is recommended"

---

🎨 Design Style:
- Use modern UI (glassmorphism or minimal dark theme)
- Rounded cards, subtle shadows
- Clean typography (monospace for code)
- Syntax highlighting for code blocks
- Responsive but optimized for desktop

---

⚙️ API Integration:

POST request:
http://localhost:3001/battle

Request Body:
{
  "problem": string
}

Response Structure:
{
  problem: string,
  solution_1: string,
  solution_2: string,
  judge: {
    solution_1_score: number,
    solution_2_score: number,
    solution_1_reasoning: string,
    solution_2_reasoning: string
  }
}

---

💡 UX Enhancements:
- Loading skeleton while fetching
- Copy button for code blocks
- Expand/collapse long solutions
- Highlight winning solution visually (border/glow)

---

📱 Constraints:
- Desktop-first design
- Clean developer-focused UI (like VS Code / LeetCode style)