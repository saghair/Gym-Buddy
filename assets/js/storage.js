const KEY = "gymBuddyStats";

function defaultStats() {
  return {
    workoutsCompleted: 0,
    workoutsBuilt: 0
  };
}

export function getStats() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultStats();
    const parsed = JSON.parse(raw);
    return { ...defaultStats(), ...parsed };
  } catch {
    return defaultStats();
  }
}

export function saveStats(stats) {
  localStorage.setItem(KEY, JSON.stringify(stats));
}

export function recordWorkoutCompleted() {
  const stats = getStats();
  stats.workoutsCompleted += 1;
  saveStats(stats);
}

export function recordWorkoutBuilt() {
  const stats = getStats();
  stats.workoutsBuilt += 1;
  saveStats(stats);
}