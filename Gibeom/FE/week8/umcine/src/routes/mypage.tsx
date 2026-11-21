import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "../stores/auth-store";

export const Route = createFileRoute("/mypage")({
  beforeLoad: () => {
    if (!useAuthStore.getState().accessToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: Outlet,
});
