import { parseWorksheetParams } from "@/lib/params.js";

const EXAMPLE_TEXT = "ABCD1234";

export default async function HomePage({ searchParams }) {
  const { text, includeLowercase } = parseWorksheetParams(await searchParams);

  return (
    <main className="landing">
      <section className="card">
        <p className="eyebrow">Pencil Pals</p>
        <h1>Printable handwriting worksheets for kids.</h1>
        <p className="intro">
          Enter letters or numbers, pick your options, and print calm A4 practice sheets.
          Screen-free — kids learn on paper.
        </p>

        <form action="/preview" method="get" className="generator-form">
          <label className="field">
            <span>Letters / numbers</span>
            <input
              type="text"
              name="text"
              defaultValue={text || EXAMPLE_TEXT}
              placeholder={EXAMPLE_TEXT}
              autoComplete="off"
            />
          </label>

          <label className="checkbox">
            <input type="checkbox" name="lowercase" defaultChecked={includeLowercase} value="1" />
            <span>Include lowercase versions for letters</span>
          </label>

          <div className="actions">
            <button type="submit">Generate Worksheet</button>
          </div>
        </form>

        <div className="notes">
          <p>Example: entering <code>AB12</code> generates sheets for A, a, B, b, 1, and 2.</p>
        </div>
      </section>
    </main>
  );
}
