import { useState, useEffect } from "react";

// Approximate landmarks for common cities — used to localize prose.
// Expand this map as desired.
const CITY_LANDMARKS = {
  "Seattle":        "the Space Needle",
  "Los Angeles":    "the Griffith Observatory",
  "San Francisco":  "the Transamerica Pyramid",
  "New York":       "Times Square",
  "Chicago":        "the Willis Tower",
  "Boston":         "the Prudential Tower",
  "Austin":         "the Capitol",
  "Portland":       "Pioneer Courthouse Square",
  "Denver":         "Union Station",
  "Miami":          "the Freedom Tower",
  "Toronto":        "the CN Tower",
  "London":         "the Shard",
  "Paris":          "the Eiffel Tower",
  "Tokyo":          "Shinjuku Station",
  "Berlin":         "Alexanderplatz",
  "Sydney":         "the Opera House",
  "Shanghai":       "the Oriental Pearl",
  "Singapore":      "Marina Bay",
  "Dubai":          "the Burj Khalifa",
  "Mumbai":         "Gateway of India",
  "Mexico City":    "the Angel of Independence",
};

const STORAGE_KEY = "novel_reader_location";

/**
 * Resolves {{user_location}} / {{user_landmark}} / other variables.
 * Priority: cached reader geolocation -> novel defaults.
 */
export function useReaderVariables(novelDefaults = {}) {
  const [overrides, setOverrides] = useState({});

  useEffect(() => {
    // Try cached first (avoid re-fetching on every page)
    try {
      const cached = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (cached && cached.ts && Date.now() - cached.ts < 24 * 3600 * 1000) {
        setOverrides(cached.vars || {});
        return;
      }
    } catch {}

    // Lightweight IP geolocation (free, no key needed)
    fetch("https://ipapi.co/json/")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (!data?.city) return;
        const city = data.city;
        const landmark = CITY_LANDMARKS[city] || `downtown ${city}`;
        const vars = {
          user_location: city,
          user_landmark: landmark,
        };
        setOverrides(vars);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now(), vars }));
        } catch {}
      })
      .catch(() => { /* silent — fall back to defaults */ });
  }, []);

  const resolved = { ...novelDefaults, ...overrides };

  function interpolate(text) {
    if (!text) return text;
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return resolved[key] !== undefined ? resolved[key] : match;
    });
  }

  return { variables: resolved, interpolate };
}
