export const DEFAULT_TEXT = "ABCD1234";

export function parseWorksheetSearchParams(searchParams) {
  return { text: searchParams.get("text") ?? DEFAULT_TEXT };
}

export function worksheetBackParams({ text }) {
  return new URLSearchParams({ text });
}
