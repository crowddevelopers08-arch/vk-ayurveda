import CTASection from "@/component/CTASection";
import ConditionsTreat from "@/component/ConditionsTreat";
import ConsultationModal from "@/component/ConsultationModal";
import FAQ from "@/component/FAQ";
import Footer from "@/component/Footer";
import AyurvedaBanner from "@/component/Hero";
import Navbar from "@/component/Navbar";
import NumbersSpeak from "@/component/NumbersSpeak";
import PatientVideos from "@/component/PatientVideos";
import Problems from "@/component/Problems";
import Programs from "@/component/Programs";
import ReviewSection from "@/component/Reviews";
import Treatment from "@/component/Treatment";
import MobileActionBar from "@/component/fat-mobile-action-bar";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#1a1a2e]">
      <MobileActionBar />
      <ConsultationModal />
      <Navbar />
      <AyurvedaBanner />
      <Problems />
      <ConditionsTreat />
      <PatientVideos />
      <NumbersSpeak />
      <Treatment />
      <Programs />
      <ReviewSection />
      <FAQ />
      <CTASection />
      <Footer />
    </main>
  );
}
