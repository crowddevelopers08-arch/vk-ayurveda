import LegalPageShell from "@/component/LegalPageShell";
import CancellationRefund from "@/component/CancellationRefund";

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
