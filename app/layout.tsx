import "./globals.css";

export const metadata = {
  title: "AI Movie Insight Builder",
  description: "IMDb insights + AI sentiment summary",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
