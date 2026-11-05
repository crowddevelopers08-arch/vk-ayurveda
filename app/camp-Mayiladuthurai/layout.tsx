import CampShell from "@/component/camp/CampShell";

export default function CampLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CampShell>{children}</CampShell>;
}
