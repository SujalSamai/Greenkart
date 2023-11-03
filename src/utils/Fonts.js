import { Outfit, Manrope } from "next/font/google";
import localFont from "next/font/local";

export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const cirka = localFont({
  src: [
    {
      path: "../../public/Cirka-Variable.ttf",
      weight: "400",
    },
    {
      path: "../../public/Cirka-Variable.ttf",
      weight: "500",
    },
    {
      path: "../../public/Cirka-Variable.ttf",
      weight: "700",
    },
    {
      path: "../../public/Cirka-Variable.ttf",
      weight: "900",
    },
  ],
  variable: "--font-cirka",
});
