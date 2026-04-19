import { useState, useEffect, useCallback } from "react";

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
  "Bellevue":       "Bellevue Downtown Park",
  "Irvine":         "the Irvine Spectrum",
  "San Diego":      "the Gaslamp Quarter",
  "Phoenix":        "Camelback Mountain",
  "Dallas":         "Reunion Tower",
  "Houston":        "the Space Center",
  "Atlanta":        "Centennial Olympic Park",
  "Philadelphia":   "Independence Hall",
  "Washington":     "the Washington Monument",
  "Minneapolis":    "the Stone Arch Bridge",
  "Detroit":        "the Renaissance Center",
  "Las Vegas":      "the Strip",
  "Honolulu":       "Diamond Head",
  "Anchorage":      "the Chugach Mountains",
};

const LOCATION_KEY = "novel_reader_location";
const SETTINGS_KEY = "novel_reader_settings";

function landmarkForCity(city) {
  return CITY_LANDMARKS[city] || `downtown ${city}`;
}

export function useReaderVariables(novelDefaults = {}) {
  const [locationVars, setLocationVars] = useState({});
  const [settings, setSettings] = useState({});
  const [locationRequested, setLocationRequested] = useState(false);

  useEffect(() => {
    try {
      const cached = JSON.parse(localStorage.getItem(LOCATION_KEY) || "null");
      if (cached && cached.ts && Date.now() - cached.ts < 7 * 24 * 3600 * 1000) {
        setLocationVars(cached.vars || {});
        setLocationRequested(true);
      }
    } catch {}

    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
      setSettings(saved);
    } catch {}
  }, []);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`, {
          headers: { "Accept-Language": "en" },
        })
          .then((r) => r.ok ? r.json() : null)
          .then((data) => {
            if (!data?.address) return;
            const city = data.address.city || data.address.town || data.address.village || data.address.county || "Unknown";
            const vars = {
              user_location: city,
              user_landmark: landmarkForCity(city),
            };
            setLocationVars(vars);
            setLocationRequested(true);
            try {
              localStorage.setItem(LOCATION_KEY, JSON.stringify({ ts: Date.now(), vars }));
            } catch {}
          })
          .catch(() => {});
      },
      () => {
        setLocationRequested(true);
      }
    );
  }, []);

  const updateSetting = useCallback((key, value) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const resolved = { ...novelDefaults, ...locationVars, ...settings };

  function interpolate(text) {
    if (!text) return text;
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return resolved[key] !== undefined ? resolved[key] : match;
    });
  }

  return {
    variables: resolved,
    interpolate,
    requestLocation,
    locationRequested,
    settings,
    updateSetting,
  };
}
