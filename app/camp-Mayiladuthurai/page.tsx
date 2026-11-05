import type { Metadata } from "next";
import CampAbout from "@/component/camp/CampAbout";
import CampBooking from "@/component/camp/CampBooking";
import CampFooter from "@/component/camp/CampFooter";
import CampHeader from "@/component/camp/CampHeader";
import CampHero from "@/component/camp/CampHero";
import { campCopy } from "@/component/camp/data";
import MobileBookBar from "@/component/camp/MobileBookBar";

export const metadata: Metadata = {
  title: campCopy.en.title,
  description: campCopy.en.sub,
};

export default function CampPage() {
  return (
    <>
      <CampHeader />
      <main>
        <CampHero />
        <CampAbout />
        <CampBooking />
      </main>
      <CampFooter />
      <MobileBookBar />
    </>
  );
}
