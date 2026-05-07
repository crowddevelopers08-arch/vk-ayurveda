"use client";

import ConsultationModal from "./ConsultationModal";
import Navbar from "./tknavbar";
import PrivacyPolicy from "./PrivacyPolicy";

export default function PrivacyPageShell() {
  return (
    <>
      <Navbar />
      <ConsultationModal />
      <PrivacyPolicy />
    </>
  );
}
