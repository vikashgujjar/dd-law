import type { Metadata } from "next";
import { RailNav } from "@/components/v3/RailNav";
import { CoverV3 } from "@/components/v3/CoverV3";
import { FeaturedV3 } from "@/components/v3/Chapter";
import { VoiceV3 } from "@/components/v3/VoiceV3";
import { LeadershipV3 } from "@/components/v3/LeadershipV3";
import { TeamV3 } from "@/components/v3/TeamV3";
import { AdvantagesV3 } from "@/components/v3/AdvantagesV3";
import { SolutionsV3 } from "@/components/v3/SolutionsV3";
import { TestimonialV3 } from "@/components/v3/TestimonialV3";
import { PressV3 } from "@/components/v3/PressV3";
import { ContactV3 } from "@/components/v3/ContactV3";
import { FooterV3 } from "@/components/v3/FooterV3";

/** Third homepage concept: editorial magazine in forest, bone, sage and clay. */
export const metadata: Metadata = {
  title: "DD LAW | Dhanu Dhaliwal Law Group — Homepage V3",
  description:
    "Dhanu Dhaliwal Law Group practices family, criminal, immigration, and civil law in Abbotsford and Surrey. Understanding You is Our Advantage.",
  // Design preview: keep it out of search results and point to the live homepage.
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function HomeV3() {
  return (
    <>
      <RailNav />
      <main id="main" className="lg:pl-[92px]">
        <CoverV3 />
        <FeaturedV3 />
        <VoiceV3 />
        <LeadershipV3 />
        <TeamV3 />
        <AdvantagesV3 />
        <SolutionsV3 />
        <TestimonialV3 />
        <PressV3 />
        <ContactV3 />
      </main>
      <div className="lg:pl-[92px]">
        <FooterV3 />
      </div>
    </>
  );
}
