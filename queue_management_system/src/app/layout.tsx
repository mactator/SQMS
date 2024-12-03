import { Background } from "@/components/background";
import Header from "@/components/header";
import "@/styles/global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "STC Dashboard",
  description: "STC Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-theme="dark">
      <body>
        <Background />
        <Header />
        {children}
      </body>
    </html>
  );
}
