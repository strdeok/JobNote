import type { Metadata } from "next";
import "./globals.css";
import ClientProvider from "./clientProvider";

export const metadata: Metadata = {
  title: "Jobnote",
  description:
    "지원 현황, 면접 일정, 문서 버전 관리까지 한 번에 — Jobnote로 효율적인 취업 준비를 시작하세요.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`antialiased`}>
        <ClientProvider>
          {children}
          {modal}
        </ClientProvider>
      </body>
    </html>
  );
}
