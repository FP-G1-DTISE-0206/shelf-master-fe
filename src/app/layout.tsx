import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ToastProvider } from "@/providers/ToastProvider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import ClientProvider from "@/providers/ClientProvider";


config.autoAddCss = false;

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "ShelfMaster",
  description: "ShelfMaster",
  icons: {
    icon: "/images/shelfmaster_icon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider refetchInterval={120} session={session}>
        <ClientProvider>
          <body
            className={`${rubik.className} antialiased bg-shelf-light-grey h-screen`}
          >
            <ToastProvider>{children}</ToastProvider>
          </body>
        </ClientProvider>
      </SessionProvider>
    </html>
  );
}
