import { Suspense } from "react";

import { PreviewClient } from "./PreviewClient.js";

export default function PreviewPage() {
  return (
    <Suspense
      fallback={
        <main className="preview-root">
          <section className="empty-state cardish">
            <p>Loading worksheets…</p>
          </section>
        </main>
      }
    >
      <PreviewClient />
    </Suspense>
  );
}
