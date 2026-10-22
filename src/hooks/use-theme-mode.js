import { useEffect, useState } from "react";

const KEY = "portfolio-theme";

// why: storage can throw (private mode, blocked site data), so every access is
// guarded and the page simply falls back to the light default.
const readSaved = () => {
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
};

const useThemeMode = () => {
  const [isDark, setIsDark] = useState(() => readSaved() === "dark");

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, isDark ? "dark" : "light");
    } catch {
      /* non-essential preference */
    }
  }, [isDark]);

  return [isDark, () => setIsDark((d) => !d)];
};

export default useThemeMode;
