import CTASection from "@/component/ayurveda-generic/CTASection";
import MobileActionBar from "@/component/ayurveda-generic/fat-mobile-action-bar";
import FeatureCards from "@/component/ayurveda-generic/feature-cards";
import Footer from "@/component/ayurveda-generic/Footer";
import HeroReplica from "@/component/ayurveda-generic/hero-replica";
import Navbar from "@/component/ayurveda-generic/Navbar";
import ReviewSection from "@/component/ayurveda-generic/Reviews";

export const metadata = {
  title: "VK Ayurveda — Pain Relief & Neuro Care",
};

export default function GenericPage() {
  return (
    <main className="overflow-x-clip">
      <MobileActionBar />
      <Navbar />
      <HeroReplica />
      <FeatureCards />
      <ReviewSection />
      <CTASection />
      <Footer />
    </main>
  );
}
