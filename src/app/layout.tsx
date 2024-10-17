"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "./context/CartProvider";
const inter = Inter({ subsets: ["latin"] });

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
            <CartProvider>
              <Toaster richColors />          {/* el "isDashboard" chequea si la ruta actual es "/dashboard", para solucionar es posible que haya que hacer un refolding o usar la sintaxis () en las carpetas */}
              {!isDashboard && <Header />}
              {children}
              {!isDashboard && <Footer />}
            </CartProvider>
          </NextUIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
