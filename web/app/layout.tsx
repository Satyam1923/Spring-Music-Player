"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/header";
import { usePathname } from "next/navigation";
import { ClientProvider } from "../components/clientProvider";
import MusicPlayer from "@/components/musicPlayer/musicPlayer";
import ProtectedLayout from "@/components/protectedRoute";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider>
          {!isAuthRoute && <Header />}
          <div className="pb-8">
            {isAuthRoute ? (
              children
            ) : (
              <ProtectedLayout>{children}</ProtectedLayout>
            )}
          </div>
          {!isAuthRoute && (
            <div
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                zIndex: 1000,
              }}
            >
              <MusicPlayer />
            </div>
          )}
        </ClientProvider>
      </body>
    </html>
  );
}
