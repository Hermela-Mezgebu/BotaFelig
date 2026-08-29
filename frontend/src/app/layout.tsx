import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BotaFelig | Ethiopia's Billboard Marketplace",
  description:
    "Discover, compare, and book billboard advertising spaces across Ethiopia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#f8f9ff] text-slate-950 transition-colors duration-300 dark:bg-[#080d16] dark:text-white">
        {children}
      </body>
    </html>
  );
}