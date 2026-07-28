const EXAMPLE_TEXT = "ABCD1234";

function getQueryValue(value) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const text = getQueryValue(params?.text) ?? EXAMPLE_TEXT;
  const lowercaseParam = getQueryValue(params?.lowercase);
  const arrowsParam = getQueryValue(params?.arrows);
  const includeLowercase = lowercaseParam === undefined ? true : lowercaseParam === "1";
  const showArrows = arrowsParam === undefined ? true : arrowsParam === "1";

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
              defaultValue={text}
              placeholder="ABCD1234"
              autoComplete="off"
            />
          </label>

          <label className="checkbox">
            <input type="checkbox" name="lowercase" defaultChecked={includeLowercase} value="1" />
            <span>Include lowercase versions for letters</span>
          </label>

          <label className="checkbox">
            <input type="checkbox" name="arrows" defaultChecked={showArrows} value="1" />
            <span>Show guiding arrows on demo letter</span>
          </label>

          <div className="actions">
            <button type="submit">Generate Worksheet</button>
          </div>
        </form>

        <div className="notes">
          <p>Example: entering <code>AB12</code> generates sheets for A, a, B, b, 1, and 2.</p>
          <p>PDF/PNG export will build on the same printable page layout.</p>
        </div>
      </section>
    </main>
  );
}
