"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
const inter = Inter({ subsets: ["latin"] });

/* Esto puede ubicarse en los Pages */
// export const metadata: Metadata = {
//   title: "Moskow Commerce",
//   description: "Generated by Moskow Group",
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const isDashboard = pathName.startsWith('/dashboard');
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider
        refetchOnWindowFocus={false}
        refetchWhenOffline={false}
        >
          <NextUIProvider>
            <Toaster richColors />          {/* el "isDashboard" chequea si la ruta actual es "/dashboard", para solucionar es posible que haya que hacer un refolding o usar la sintaxis () en las carpetas */}
            {!isDashboard && <Header />}
            {children}
            {!isDashboard && <Footer />}
          </NextUIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
