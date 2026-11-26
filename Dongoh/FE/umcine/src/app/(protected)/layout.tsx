import type { ReactNode } from "react";
import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}
