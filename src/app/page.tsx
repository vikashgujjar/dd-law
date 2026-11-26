import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Voice } from "@/components/sections/Voice";
import { Team } from "@/components/sections/Team";
import { Advantages } from "@/components/sections/Advantages";
import { Solutions } from "@/components/sections/Solutions";
import { Testimonials } from "@/components/sections/Testimonials";
import { Press } from "@/components/sections/Press";
import { Contact } from "@/components/sections/Contact";
import { PHONE, offices } from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Dhanu Dhaliwal Law Group",
  alternateName: "DD LAW",
  url: "https://ddlaw.ca",
  logo: "https://ddlaw.ca/wp-content/uploads/2026/06/DD-law-logo.png",
  telephone: PHONE.display,
  slogan: "Understanding You is Our Advantage",
  areaServed: "British Columbia, Canada",
  knowsAbout: ["Family Law", "Criminal Law", "Immigration Law", "Civil Litigation", "Wills & Estates"],
  address: offices.map((o) => ({
    "@type": "PostalAddress",
    streetAddress: o.address,
    addressLocality: o.name.replace(" Office", ""),
    addressRegion: "BC",
    addressCountry: "CA",
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main id="main">
        <Hero />
        <Voice />
        <Team />
        <Advantages />
        <Solutions />
        <Testimonials />
        <Press />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
