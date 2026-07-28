export function getQueryValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

export function parseWorksheetParams(searchParams) {
  const text = getQueryValue(searchParams?.text) ?? "ABCD1234";
  const lowercaseParam = getQueryValue(searchParams?.lowercase);
  const includeLowercase = lowercaseParam === undefined ? true : lowercaseParam === "1";

  return { text, includeLowercase };
}

export function worksheetBackParams({ text, includeLowercase }) {
  const params = new URLSearchParams({ text });
  params.set("lowercase", includeLowercase ? "1" : "0");
  return params;
}
