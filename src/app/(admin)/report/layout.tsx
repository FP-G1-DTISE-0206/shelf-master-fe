import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShelfMaster | Report and Analysis",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
