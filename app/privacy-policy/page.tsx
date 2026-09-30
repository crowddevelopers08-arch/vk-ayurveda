import LegalPageShell from "@/component/LegalPageShell";
import PrivacyPolicy from "@/component/PrivacyPolicy";

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
