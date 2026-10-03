import CancellationRefund from "@/component/ayurveda-generic/CancellationRefund";
import LegalPageShell from "@/component/ayurveda-generic/LegalPageShell";


export const metadata = {
  title: "Cancellation & Refund Policy — VK Ayurveda",
};

export default function CancellationRefundPage() {
  return (
    <LegalPageShell>
      <CancellationRefund />
    </LegalPageShell>
  );
}
