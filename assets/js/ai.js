// assets/js/ai.js

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

/**
 * Smart suggestions prompt:
 * Uses last workout + user body weight + goal.
 * Outputs a structured but plain-text answer we can display nicely.
 */
export function buildSuggestionsPrompt({
  goal,
  weightKg,
  lastSessionDate,
  lastSessionTotalWeight,
  sessionsThisWeek,
  daysSinceLastSession
}) {
  return `
You are Gym Buddy AI — a practical gym coach.

User profile:
- Goal: ${goal || "Not set"}
- Body weight: ${weightKg ? `${weightKg} kg` : "Not set"}

Training context:
- Last session date: ${lastSessionDate || "No data"}
- Last session total weight lifted: ${
    typeof lastSessionTotalWeight === "number" ? `${lastSessionTotalWeight} kg` : "No data"
  }
- Sessions this week: ${typeof sessionsThisWeek === "number" ? sessionsThisWeek : "No data"}
- Days since last session: ${typeof daysSinceLastSession === "number" ? daysSinceLastSession : "No data"}

Task:
Create smart automatic suggestions for today and the next workout.

Output format (plain text, no markdown):
1) TODAY SUMMARY: 1–2 short lines.
2) NEXT WORKOUT (5–7 exercises): each line "Exercise — sets x reps (or time)".
3) PROGRESSION TIP: 1 short paragraph based on the last session and goal.
4) NUTRITION TIP: 1 short paragraph. If goal is build muscle, give a protein range in g/day using 1.6–2.2 g/kg (only if weight is known).
5) RECOVERY TIP: 1 short paragraph.
Rules:
- Keep it safe and general (no medical advice).
- Make it realistic (no extreme recommendations).
- If data is missing, adapt but still be helpful.
`;
}
