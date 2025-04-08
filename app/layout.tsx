import "./globals.css";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html className="h-full bg-white">
      <body className="h-full">{children}</body>
    </html>
  );
}
