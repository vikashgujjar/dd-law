import { DM_Sans, Instrument_Serif } from "next/font/google";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

/** V3 gets its own type pairing; fonts load only on this route. */
export default function V3Layout({ children }: { children: React.ReactNode }) {
  return <div className={`v3 ${instrument.variable} ${dmSans.variable} bg-bone text-forest`}>{children}</div>;
}
