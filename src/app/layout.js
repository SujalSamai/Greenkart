import Navbar from "./components/Navbar";
import GlobalState from "./context";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GreenKart - Turn it Green.",
  description:
    "An eco-friendly e-commerce application for a sustainable future.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          <Navbar />
          <main className="flex flex-col min-h-screen mt-24">
            {children}
          </main>
        </GlobalState>
      </body>
    </html>
  );
}
