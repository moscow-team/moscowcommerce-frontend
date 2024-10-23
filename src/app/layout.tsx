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
import { ProductProvider } from "./context/ProductContext";
const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const isDashboard = pathName.startsWith("/dashboard");
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider
          refetchOnWindowFocus={false}
          refetchWhenOffline={false}
        >
          <NextUIProvider>
            <ProductProvider>
              <CartProvider>
                <Toaster richColors />
                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: "auto 1fr auto",
                    minHeight: "100vh",
                  }}
                >
                  {!isDashboard && <Header />}
                  <div>{children}</div>
                  {!isDashboard && <Footer />}
                </div>
              </CartProvider>
            </ProductProvider>
          </NextUIProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
