import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ekiek",
  description: "A private personal agent that travels with your work and compiles only the context each tool needs."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
