import type { Metadata } from "next";
import CampThankYou from "@/component/camp/CampThankYou";
import { campCopy } from "@/component/camp/data";

export const metadata: Metadata = {
  title: campCopy.en.title,
  robots: { index: false, follow: false },
};

export default async function CampThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { payment_id } = await searchParams;
  const paymentId = typeof payment_id === "string" ? payment_id.slice(0, 40) : undefined;

  return <CampThankYou paymentId={paymentId} />;
}
