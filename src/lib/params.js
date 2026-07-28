export function getQueryValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

export function parseWorksheetParams(searchParams) {
  const text = getQueryValue(searchParams?.text) ?? "ABCD1234";
  return { text };
}

export function parseWorksheetSearchParams(searchParams) {
  const text = searchParams.get("text") ?? "ABCD1234";
  return { text };
}

export function worksheetBackParams({ text }) {
  return new URLSearchParams({ text });
}
