/**
 * Lightweight emotion + playlist engine for felt.
 * Fully offline. Swap analyzeFeeling() later for a real LLM if you want.
 */

function analyzeFeeling(text) {
  const lower = text.toLowerCase().trim();

  const scores = {};
  for (const [key, profile] of Object.entries(EMOTION_PROFILES)) {
    if (key === "default") continue;
    let score = 0;
    for (const tag of profile.tags) {
      if (lower.includes(tag)) score += 3;
    }
    if (key === "proud_lonely" && (lower.includes("proud") && lower.includes("lonely"))) score += 8;
    if (key === "quiet_after" && (lower.includes("quiet") && (lower.includes("after") || lower.includes("fight")))) score += 8;
    if (key === "nostalgic" && (lower.includes("nostalgia") || lower.includes("remember") || lower.includes("used to") || lower.includes("summer"))) score += 4;
    if (key === "restless" && (lower.includes("restless") || lower.includes("nowhere") || lower.includes("stuck") || lower.includes("energy"))) score += 4;
    if (key === "devastated" && (lower.includes("devastat") || lower.includes("broken") || lower.includes("shattered"))) score += 5;
    if (key === "hopeful" && (lower.includes("hope") || lower.includes("maybe") || lower.includes("starting"))) score += 3;
    if (key === "angry" && (lower.includes("angry") || lower.includes("mad") || lower.includes("furious") || lower.includes("hate"))) score += 4;
    if (key === "dreamy" && (lower.includes("dream") || lower.includes("float") || lower.includes("haze"))) score += 3;
    if (key === "lonely" && (lower.includes("lonely") || lower.includes("alone") || lower.includes("empty"))) score += 3;
    if (key === "heartbroken" && (lower.includes("heart") || lower.includes("miss") || lower.includes("left") || lower.includes("ex"))) score += 3;

    scores[key] = score;
  }

  let bestKey = "default";
  let bestScore = 0;
  for (const [key, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestKey = key;
    }
  }

  const profile = EMOTION_PROFILES[bestKey] || EMOTION_PROFILES.default;

  let customName = profile.name;
  if (bestScore < 3) {
    const words = text.split(/\s+/).filter(w => w.length > 3).slice(0, 4);
    if (words.length >= 2) {
      customName = words.map(w => w.toLowerCase()).join(" ");
    }
  }

  return {
    key: bestKey,
    name: customName,
    description: profile.description,
    tags: profile.tags,
    rawText: text
  };
}

function generatePlaylist(emotion, tastes = {}) {
  const { genres = [], vibes = [], artists = "" } = tastes;
  const artistList = artists
    .split(/[,;]/)
    .map(a => a.trim().toLowerCase())
    .filter(Boolean);

  const scored = SONG_CATALOG.map(song => {
    let score = 0;

    for (const tag of emotion.tags) {
      if (song.tags.some(t => t.includes(tag) || tag.includes(t))) score += 4;
    }
    for (const g of genres) {
      if (song.genres.some(sg => sg.toLowerCase() === g.toLowerCase())) score += 3;
    }
    for (const v of vibes) {
      if (song.vibes.some(sv => sv.toLowerCase() === v.toLowerCase())) score += 2.5;
    }
    for (const a of artistList) {
      if (song.artist.toLowerCase().includes(a) || a.includes(song.artist.toLowerCase())) {
        score += 8;
      }
    }
    score += Math.random() * 2;
    return { song, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const selected = [];
  const seen = new Set();

  for (const item of scored) {
    const key = item.song.title + "|" + item.song.artist;
    if (seen.has(key)) continue;
    seen.add(key);
    selected.push(item.song);
    if (selected.length >= 12) break;
  }

  if (selected.length < 10) {
    for (const item of scored) {
      const key = item.song.title + "|" + item.song.artist;
      if (seen.has(key)) continue;
      seen.add(key);
      selected.push(item.song);
      if (selected.length >= 10) break;
    }
  }

  return selected.map((song, i) => ({
    ...song,
    reason: song.reason || "matches the texture of what you described.",
    position: i + 1
  }));
}
