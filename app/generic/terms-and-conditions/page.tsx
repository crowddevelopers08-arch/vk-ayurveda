import LegalPageShell from "@/component/ayurveda-generic/LegalPageShell";
import TermsConditions from "@/component/ayurveda-generic/TermsConditions";

export const metadata = {
  title: "Terms & Conditions — VK Ayurveda",
};

export default function TermsConditionsPage() {
  return (
    <LegalPageShell>
      <TermsConditions />
    </LegalPageShell>
  );
}
