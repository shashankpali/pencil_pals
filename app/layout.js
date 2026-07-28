import "./globals.css";

export const metadata = {
  title: "Pencil Pals",
  description: "Printable handwriting worksheets for parents and teachers. Screen-free practice kids love."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
