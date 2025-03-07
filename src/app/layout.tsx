import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { AuthContextProvider } from "./context/auth_context";
import { CartContextProvider } from "./context/cart_context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rebooted.biz",
  description: "Your one-stop shop for all things tech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <CartContextProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
