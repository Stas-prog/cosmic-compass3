import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Cosmic-compass3",
  description: "Generated",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>      
    </html>
  )
}