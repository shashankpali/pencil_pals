import { buildWorksheetSpec } from "../../../src/lib/buildWorksheetSpec.js";
import { expandCharacters } from "../../../src/lib/expandCharacters.js";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text") ?? "A5";
  const includeLowercase = searchParams.get("lowercase") === "1";
  const chars = expandCharacters(text, includeLowercase, true);

  return Response.json({
    input: text,
    includeLowercase,
    chars,
    specs: chars.map(buildWorksheetSpec)
  });
}
