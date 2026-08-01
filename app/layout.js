import localFont from "next/font/local";

import "./globals.css";

const sassoon = localFont({
  src: "../public/fonts/sassoon-primary-regular.otf",
  variable: "--font-sassoon",
  display: "swap"
});

/** Digits only — falls through to Sassoon for letters. */
const primer = localFont({
  src: "../public/fonts/primer-print.otf",
  variable: "--font-primer",
  display: "swap",
  declarations: [{ prop: "unicode-range", value: "U+0030-0039" }]
});

export const metadata = {
  title: "Pencil Pals",
  description: "Printable handwriting worksheets for parents and teachers. Screen-free practice kids love."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sassoon.variable} ${primer.variable}`}>
      <body className={sassoon.className}>{children}</body>
    </html>
  );
}
