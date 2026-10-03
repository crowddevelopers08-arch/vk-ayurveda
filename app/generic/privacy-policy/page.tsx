import LegalPageShell from "@/component/ayurveda-generic/LegalPageShell";
import PrivacyPolicy from "@/component/ayurveda-generic/PrivacyPolicy";


export const metadata = {
  title: "Privacy Policy — VK Ayurveda",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell>
      <PrivacyPolicy />
    </LegalPageShell>
  );
}
