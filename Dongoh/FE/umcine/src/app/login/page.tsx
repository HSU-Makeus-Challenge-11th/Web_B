import { GuestOnly } from "@/components/layout/guest-only";
import { LoginPage } from "@/features/auth/login-page";

export default function Page() {
  return (
    <GuestOnly>
      <LoginPage />
    </GuestOnly>
  );
}
