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

export function buildSuggestionsPromptJSON({
  goal,
  weightKg,
  lastSessionDate,
  lastSessionTotalWeight
}) {
  return `
You are Gym Buddy AI. Return ONLY valid JSON. No markdown. No extra text.

User profile:
- Goal: ${goal || "Not set"}
- Body weight: ${weightKg ? `${weightKg} kg` : "Not set"}
- Last workout date: ${lastSessionDate || "No data"}
- Last workout volume: ${lastSessionTotalWeight || "No data"}

Return JSON with this exact schema:
{
  "title": "string",
  "todaySummary": "string",
  "progressionTip": "string",
  "nutritionTip": "string",
  "recoveryTip": "string",
  "exercises": [
    {
      "name": "string",
      "sets": number,
      "reps": "string",
      "rest": "string",
      "videoQuery": "youtube search query for proper exercise form"
    }
  ]
}

Rules:
- 5 to 7 exercises
- Safe, realistic workouts
- videoQuery must be suitable for YouTube search
- If goal is Build muscle and weight known, include protein advice
- JSON ONLY
`;
}
