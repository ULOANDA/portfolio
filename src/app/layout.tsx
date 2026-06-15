import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phạm Thế Anh | Fullstack Developer Portfolio",
  description: "Portfolio cá nhân của Phạm Thế Anh - Lập trình viên Fullstack giàu kinh nghiệm thực chiến phát triển các hệ thống ERP nội bộ, CRM và Web Apps bằng ReactJS, NextJS, NestJS và Spring Boot.",
  keywords: ["Phạm Thế Anh", "Fullstack Developer", "Portfolio", "Next.js", "NestJS", "Spring Boot", "React Developer", "Hanoi", "Vietnam"],
  authors: [{ name: "Phạm Thế Anh" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030303]">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
