export function getQueryValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

export function parseWorksheetParams(searchParams) {
  const text = getQueryValue(searchParams?.text) ?? "ABCD1234";
  const includeLowercase = getQueryValue(searchParams?.lowercase) !== "0";

  return { text, includeLowercase };
}

export function worksheetBackParams({ text, includeLowercase }) {
  return new URLSearchParams({ text, lowercase: includeLowercase ? "1" : "0" });
}
