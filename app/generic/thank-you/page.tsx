import Navbar from "@/component/ayurveda-generic/Navbar";
import ThankYou from "@/component/ayurveda-generic/thank";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { payment_id } = await searchParams;
  const paymentId = typeof payment_id === "string" ? payment_id.slice(0, 40) : undefined;

  return (
    <>
      <Navbar />
      <ThankYou paymentId={paymentId} />
    </>
  );
}
