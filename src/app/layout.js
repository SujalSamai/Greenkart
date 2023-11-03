import Navbar from "../components/Navbar";
import GlobalState from "../context";
import "./globals.css";
import { outfit, cirka, manrope } from "../utils/Fonts";

export const metadata = {
  title: "GreenKart - Turn it Green.",
  description:
    "An eco-friendly e-commerce application for a sustainable future.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${outfit.variable} ${cirka.variable} ${manrope.variable} bg-primary font-para`}
      >
        <GlobalState>
          <Navbar />
          <main className="flex flex-col min-h-screen mt-[80px]">
            {children}
          </main>
        </GlobalState>
      </body>
    </html>
  );
}
