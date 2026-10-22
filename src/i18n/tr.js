// Picks the right language from an `{ en, sv }` value in constants.js.
// Plain strings (tech names, titles that never change) pass through as-is,
// so only fields that actually differ need the object form.
export const tr = (value, lang) => {
  if (value && typeof value === "object" && !Array.isArray(value) && "en" in value) {
    return value[lang] ?? value.en;
  }
  return value;
};
