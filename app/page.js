const EXAMPLE_TEXT = "ABCD1234";

export default function HomePage() {
  return (
    <main className="landing">
      <section className="card">
        <p className="eyebrow">Pencil Pals</p>
        <h1>Printable handwriting worksheets for kids.</h1>
        <p className="intro">
          Enter letters or numbers and print calm A4 practice sheets.
          Screen-free — kids learn on paper.
        </p>

        <form action="preview" method="get" className="generator-form">
          <label className="field">
            <span>Letters / numbers</span>
            <input
              type="text"
              name="text"
              defaultValue={EXAMPLE_TEXT}
              placeholder={EXAMPLE_TEXT}
              autoComplete="off"
            />
          </label>

          <div className="actions">
            <button type="submit">Generate Worksheet</button>
          </div>
        </form>

        <div className="notes">
          <p>Example: entering <code>AB12</code> generates sheets for A, B, 1, and 2. Type lowercase letters if you want those sheets too.</p>
        </div>
      </section>
    </main>
  );
}
