const DB_NAME = "novel_images";
const STORE_NAME = "generated";
const DB_VERSION = 1;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function dbGet(db, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

function dbPut(db, key, value) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const req = tx.objectStore(STORE_NAME).put(value, key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export function cacheKey(chapterNumber, theme) {
  return `ch${chapterNumber}_${theme}`;
}

export async function getCachedImage(chapterNumber, theme) {
  try {
    const db = await openDB();
    return await dbGet(db, cacheKey(chapterNumber, theme));
  } catch {
    return null;
  }
}

export async function generateImage(chapterNumber, theme, openaiKey, prompt) {
  const cached = await getCachedImage(chapterNumber, theme);
  if (cached) return cached;

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1792x1024",
      quality: "standard",
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || "Image generation failed");
  }

  const data = await response.json();
  const imageUrl = data.data[0]?.url;
  if (!imageUrl) throw new Error("No image returned");

  const imageBlob = await fetch(imageUrl).then((r) => r.blob());
  const reader = new FileReader();
  const dataUrl = await new Promise((resolve) => {
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(imageBlob);
  });

  try {
    const db = await openDB();
    await dbPut(db, cacheKey(chapterNumber, theme), dataUrl);
  } catch {}

  return dataUrl;
}
