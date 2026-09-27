export type HistoryItem = { id: string; date: string; image: string; diseaseId: string; confidence: number };

const KEY = "leafdoctor-history";

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function addHistory(item: HistoryItem) {
  const list = [item, ...getHistory()].slice(0, 30);
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* storage full */ }
}

export function clearHistory() { localStorage.removeItem(KEY); }

export function removeHistory(id: string) {
  localStorage.setItem(KEY, JSON.stringify(getHistory().filter((h) => h.id !== id)));
}

export function toThumb(file: File, size = 320): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1, size / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = img.width * s; c.height = img.height * s;
      c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL("image/jpeg", 0.7));
    };
    img.onerror = () => resolve("");
    img.src = URL.createObjectURL(file);
  });
}
