import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";
import { ThemeProvider } from "../lib/useTheme";
import { initAionConsole } from "../lib/aionConsole";

function isFormField(el) {
  if (!el) return false;
  const tag = (el.tagName || "").toUpperCase();
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (el.isContentEditable) return true;
  return false;
}

export default function App({ Component, pageProps }) {
  useEffect(() => {
    initAionConsole();
  }, []);

  // Discourage casual copying of prose. Form fields are exempt so the
  // comment composer, owner-key entry, and receipt sharing still work.
  useEffect(() => {
    const blockIfNotForm = (e) => {
      if (!isFormField(e.target)) {
        e.preventDefault();
        return false;
      }
    };
    const blockKeyboardCopy = (e) => {
      if (isFormField(e.target)) return;
      const cmdOrCtrl = e.metaKey || e.ctrlKey;
      if (!cmdOrCtrl) return;
      const k = (e.key || "").toLowerCase();
      // c = copy, x = cut, a = select all, p = print, s = save
      if (k === "c" || k === "x" || k === "a" || k === "p" || k === "s") {
        e.preventDefault();
      }
    };
    document.addEventListener("copy", blockIfNotForm);
    document.addEventListener("cut", blockIfNotForm);
    document.addEventListener("contextmenu", blockIfNotForm);
    document.addEventListener("dragstart", blockIfNotForm);
    document.addEventListener("keydown", blockKeyboardCopy);
    return () => {
      document.removeEventListener("copy", blockIfNotForm);
      document.removeEventListener("cut", blockIfNotForm);
      document.removeEventListener("contextmenu", blockIfNotForm);
      document.removeEventListener("dragstart", blockIfNotForm);
      document.removeEventListener("keydown", blockKeyboardCopy);
    };
  }, []);

  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  );
}
