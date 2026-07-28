import "./globals.css";

export const metadata = {
  title: "Pencil Pals",
  description: "Printable handwriting worksheets for parents and teachers. Screen-free practice kids love."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link href="https://fonts.cdnfonts.com/css/print" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
