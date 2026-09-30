"use client";

import type { ReactNode } from "react";
import ConsultationModal from "./ConsultationModal";
import Footer from "./Footer";
import Navbar from "./tknavbar";

export default function LegalPageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <ConsultationModal />
      {children}
      <Footer />
    </>
  );
}
