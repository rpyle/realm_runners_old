import { SAVE_KEY } from "./data.js";

export function shadeColor(hex, amt) {
  try {
    const n = parseInt(hex.replace("#", ""), 16);
    const r = Math.max(0, Math.min(255, (n >> 16) + amt));
    const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amt));
    const b = Math.max(0, Math.min(255, (n & 0xff) + amt));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  } catch { return hex; }
}

export function hexToRgb(hex) {
  try {
    const n = parseInt(hex.replace("#", ""), 16);
    return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
  } catch { return "100,100,150"; }
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function loadSave() {
  try { return JSON.parse(localStorage.getItem(SAVE_KEY)); }
  catch { return null; }
}

export function writeSave(d) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(d)); }
  catch {}
}

export function memStars(moves, pairs) {
  if (moves <= pairs + 1) return 3;
  if (moves <= pairs * 2)  return 2;
  return 1;
}

export function puzzleStars(mistakes) {
  if (mistakes === 0) return 3;
  if (mistakes <= 2)  return 2;
  return 1;
}
