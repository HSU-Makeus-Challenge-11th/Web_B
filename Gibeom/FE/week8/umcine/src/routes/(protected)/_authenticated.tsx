import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthenticatedLayout } from "../../components/layout/authenticated-layout";
import { useAuthStore } from "../../stores/auth-store";

// (protected): URL에 포함되지 않는 Route Group
// _authenticated: 로그인 후에만 볼 수 있는 페이지를 감싸는 pathless Layout Route
export const Route = createFileRoute("/(protected)/_authenticated")({
  beforeLoad: () => {
    if (!useAuthStore.getState().accessToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthenticatedLayout,
});
