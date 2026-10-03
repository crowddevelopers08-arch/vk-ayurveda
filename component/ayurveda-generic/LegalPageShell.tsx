"use client";

import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "../Footer";

export default function LegalPageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
