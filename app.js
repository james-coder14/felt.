const state = {
  tastes: { genres: [], vibes: [], artists: "" },
  currentEmotion: null,
  currentPlaylist: [],
  user: null
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function showScreen(id) {
  $$(".screen").forEach(s => s.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
}

function toast(msg, ms = 2000) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), ms);
}

function loadTastes() {
  try {
    const raw = localStorage.getItem("felt_tastes");
    if (raw) state.tastes = JSON.parse(raw);
  } catch (e) {}
}

function saveTastesLocal() {
  localStorage.setItem("felt_tastes", JSON.stringify(state.tastes));
}

function loadHistoryLocal() {
  try {
    return JSON.parse(localStorage.getItem("felt_history") || "[]");
  } catch (e) {
    return [];
  }
}

function saveHistoryLocal(list) {
  localStorage.setItem("felt_history", JSON.stringify(list.slice(0, 30)));
}

async function ensureAuth() {
  if (!firebaseReady || !auth) return null;
  return new Promise((resolve) => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        state.user = user;
        unsub();
        resolve(user);
      } else {
        try {
          const cred = await auth.signInAnonymously();
          state.user = cred.user;
          unsub();
          resolve(cred.user);
        } catch (e) {
          unsub();
          resolve(null);
        }
      }
    });
  });
}

async function savePlaylistToFirebase(playlistData) {
  if (!firebaseReady || !db || !state.user) return false;
  try {
    await db.collection("playlists").add({
      ...playlistData,
      uid: state.user.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return true;
  } catch (e) {
    return false;
  }
}

async function loadPlaylistsFromFirebase() {
  if (!firebaseReady || !db || !state.user) return [];
  try {
    const snap = await db.collection("playlists")
      .where("uid", "==", state.user.uid)
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    return [];
  }
}

function renderTasteChips() {
  const genreContainer = $("#genre-chips");
  const vibeContainer = $("#vibe-chips");

  genreContainer.innerHTML = GENRES.map(g =>
    `<button class="chip ${state.tastes.genres.includes(g) ? "selected" : ""}" data-type="genre" data-value="${g}">${g}</button>`
  ).join("");

  vibeContainer.innerHTML = VIBES.map(v =>
    `<button class="chip ${state.tastes.vibes.includes(v) ? "selected" : ""}" data-type="vibe" data-value="${v}">${v}</button>`
  ).join("");

  $("#artists-input").value = state.tastes.artists || "";
}

function toggleTaste(type, value) {
  const arr = type === "genre" ? state.tastes.genres : state.tastes.vibes;
  const idx = arr.indexOf(value);
  if (idx >= 0) arr.splice(idx, 1);
  else arr.push(value);
  renderTasteChips();
}

function renderPlaylist(emotion, tracks) {
  $("#emotion-name").textContent = emotion.name;
  $("#emotion-description").textContent = emotion.description;
  $("#playlist-feeling").textContent = `"${emotion.rawText}"`;

  const list = $("#tracks-list");
  list.innerHTML = tracks.map(t => `
    <div class="track">
      <div class="track-title">${escapeHtml(t.title)}</div>
      <div class="track-artist">${escapeHtml(t.artist)}</div>
      <div class="track-reason">${escapeHtml(t.reason)}</div>
      <div class="track-links">
        <a href="https://open.spotify.com/search/${encodeURIComponent(t.title + ' ' + t.artist)}" target="_blank" rel="noopener">spotify</a>
        <a href="https://music.apple.com/search?term=${encodeURIComponent(t.title + ' ' + t.artist)}" target="_blank" rel="noopener">apple music</a>
      </div>
    </div>
  `).join("");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function generate() {
  const text = $("#feeling-input").value.trim();
  if (!text) return;

  showScreen("loading-screen");
  $("#loading-text").textContent = "listening…";

  await sleep(900 + Math.random() * 600);

  const emotion = analyzeFeeling(text);
  state.currentEmotion = emotion;

  $("#loading-text").textContent = emotion.name;
  await sleep(500);

  const tracks = generatePlaylist(emotion, state.tastes);
  state.currentPlaylist = tracks;

  renderPlaylist(emotion, tracks);
  showScreen("playlist-screen");
}

function regenerate() {
  if (!state.currentEmotion) return;
  const tracks = generatePlaylist(state.currentEmotion, state.tastes);
  state.currentPlaylist = tracks;
  renderPlaylist(state.currentEmotion, tracks);
  toast("new songs");
}

async function saveCurrentPlaylist() {
  if (!state.currentEmotion || !state.currentPlaylist.length) return;

  const data = {
    emotionName: state.currentEmotion.name,
    emotionDescription: state.currentEmotion.description,
    rawText: state.currentEmotion.rawText,
    tracks: state.currentPlaylist.map(t => ({
      title: t.title,
      artist: t.artist,
      reason: t.reason
    })),
    tastes: { ...state.tastes },
    savedAt: new Date().toISOString()
  };

  const history = loadHistoryLocal();
  history.unshift(data);
  saveHistoryLocal(history);

  const ok = await savePlaylistToFirebase(data);
  toast(ok ? "saved" : "saved on this device");
}

async function showHistory() {
  showScreen("history-screen");
  const listEl = $("#history-list");
  const emptyEl = $("#history-empty");

  let items = loadHistoryLocal();

  if (firebaseReady && state.user) {
    const remote = await loadPlaylistsFromFirebase();
    if (remote.length) {
      items = remote.map(r => ({
        emotionName: r.emotionName,
        emotionDescription: r.emotionDescription,
        rawText: r.rawText,
        tracks: r.tracks || [],
        savedAt: r.createdAt?.toDate?.()?.toISOString?.() || r.savedAt
      }));
    }
  }

  if (!items.length) {
    listEl.innerHTML = "";
    emptyEl.style.display = "block";
    return;
  }

  emptyEl.style.display = "none";
  listEl.innerHTML = items.map((item, idx) => `
    <div class="history-item" data-idx="${idx}">
      <h3>${escapeHtml(item.emotionName || "untitled")}</h3>
      <p>${escapeHtml(item.rawText || "")} · ${item.tracks?.length || 0} songs</p>
    </div>
  `).join("");

  listEl.querySelectorAll(".history-item").forEach(el => {
    el.addEventListener("click", () => {
      const idx = +el.dataset.idx;
      const item = items[idx];
      if (!item) return;
      state.currentEmotion = {
        name: item.emotionName,
        description: item.emotionDescription,
        rawText: item.rawText,
        tags: []
      };
      state.currentPlaylist = item.tracks || [];
      renderPlaylist(state.currentEmotion, state.currentPlaylist);
      showScreen("playlist-screen");
    });
  });
}

function copyPlaylist() {
  if (!state.currentPlaylist.length) return;
  const text = state.currentPlaylist
    .map((t, i) => `${i + 1}. ${t.title} – ${t.artist}`)
    .join("\n");
  navigator.clipboard.writeText(text).then(() => toast("copied")).catch(() => {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    toast("copied");
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function init() {
  loadTastes();
  renderTasteChips();

  $("#feeling-input").addEventListener("input", (e) => {
    $("#generate-btn").disabled = !e.target.value.trim();
  });

  $$(".example").forEach(btn => {
    btn.addEventListener("click", () => {
      $("#feeling-input").value = btn.dataset.text;
      $("#generate-btn").disabled = false;
      $("#feeling-input").focus();
    });
  });

  $("#generate-btn").addEventListener("click", generate);
  $("#back-btn").addEventListener("click", () => showScreen("home-screen"));
  $("#regenerate-btn").addEventListener("click", regenerate);
  $("#save-btn").addEventListener("click", saveCurrentPlaylist);
  $("#copy-btn").addEventListener("click", copyPlaylist);

  $("#tastes-btn").addEventListener("click", () => {
    $("#tastes-modal").classList.add("active");
    renderTasteChips();
  });
  $("#close-tastes").addEventListener("click", () => {
    $("#tastes-modal").classList.remove("active");
  });
  $("#save-tastes-btn").addEventListener("click", () => {
    state.tastes.artists = $("#artists-input").value.trim();
    saveTastesLocal();
    renderTasteChips();
    $("#tastes-modal").classList.remove("active");
    toast("tastes saved");
  });

  $("#history-btn").addEventListener("click", showHistory);
  $("#back-from-history").addEventListener("click", () => showScreen("home-screen"));

  document.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip && chip.dataset.type) {
      toggleTaste(chip.dataset.type, chip.dataset.value);
    }
  });

  $("#tastes-modal").addEventListener("click", (e) => {
    if (e.target === $("#tastes-modal")) {
      $("#tastes-modal").classList.remove("active");
    }
  });

  if (firebaseReady) {
    ensureAuth();
  }
}

document.addEventListener("DOMContentLoaded", init);
