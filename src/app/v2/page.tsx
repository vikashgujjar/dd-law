import type { Metadata } from "next";
import { NavV2 } from "@/components/v2/NavV2";
import { HeroV2 } from "@/components/v2/HeroV2";
import { ManifestoV2 } from "@/components/v2/ManifestoV2";
import { LeadershipV2 } from "@/components/v2/LeadershipV2";
import { TeamV2 } from "@/components/v2/TeamV2";
import { AdvantagesV2 } from "@/components/v2/AdvantagesV2";
import { SolutionsV2 } from "@/components/v2/SolutionsV2";
import { TestimonialV2 } from "@/components/v2/TestimonialV2";
import { PressV2 } from "@/components/v2/PressV2";
import { ContactV2 } from "@/components/v2/ContactV2";
import { FooterV2 } from "@/components/v2/FooterV2";

/** Alternate homepage concept. Same content and imagery as "/", new presentation. */
export const metadata: Metadata = {
  title: "DD LAW | Dhanu Dhaliwal Law Group — Homepage V2",
  description:
    "Dhanu Dhaliwal Law Group practices family, criminal, immigration, and civil law in Abbotsford and Surrey. Understanding You is Our Advantage.",
  // Design preview: keep it out of search results and point to the live homepage.
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function HomeV2() {
  return (
    <>
      <NavV2 />
      <main id="main">
        <HeroV2 />
        <ManifestoV2 />
        <LeadershipV2 />
        <TeamV2 />
        <AdvantagesV2 />
        <SolutionsV2 />
        <TestimonialV2 />
        <PressV2 />
        <ContactV2 />
      </main>
      <FooterV2 />
    </>
  );
}
