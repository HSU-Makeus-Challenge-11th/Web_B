import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthLayout } from "../../components/layout/auth-layout";
import { useAuthStore } from "../../stores/auth-store";

// (auth) 폴더는 URL에 포함되지 않고, 로그인 후에만 볼 수 있는 페이지를 묶는 Layout Route
export const Route = createFileRoute("/(auth)")({
  beforeLoad: () => {
    if (!useAuthStore.getState().accessToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthLayout,
});
