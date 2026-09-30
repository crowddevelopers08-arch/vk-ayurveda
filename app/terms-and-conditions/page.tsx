import LegalPageShell from "@/component/LegalPageShell";
import TermsConditions from "@/component/TermsConditions";

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
