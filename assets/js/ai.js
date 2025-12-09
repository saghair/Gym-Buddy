export async function callGymBuddyAI(prompt, mode = "generic") {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, mode })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("AI error: " + text);
  }

  const data = await res.json();
  return data.reply;
}

export function buildWorkoutPrompt({ level, goal, equipment, muscle }) {
  return `
You are an AI gym coach. Create a clear, simple workout as a bullet list.

User details:
- Level: ${level}
- Goal: ${goal}
- Available equipment: ${equipment.join(", ") || "bodyweight only"}
- Focus area: ${muscle}

Rules:
- Use normal, everyday English.
- Show 5–8 exercises.
- For each exercise, show sets x reps or time.
- Keep everything in plain text, no markdown code blocks.
`;
}

export function buildCoachPrompt(question) {
  return `
You are a friendly gym coach. Answer the question in 3–6 short paragraphs max.
Do not give medical advice; keep it general and safe.

Question:
${question}
`;
}