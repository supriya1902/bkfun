import "./globals.css";

export const metadata = {
  title: "BKFUN",
  description: "Do real things. Post proof. Build your story.",
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