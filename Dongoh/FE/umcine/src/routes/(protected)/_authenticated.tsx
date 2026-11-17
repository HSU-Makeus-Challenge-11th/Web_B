import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthenticatedLayout } from "../../components/layout/authenticated-layout";
import { useAuthStore } from "../../stores/auth-store";

export const Route = createFileRoute("/(protected)/_authenticated")({
  beforeLoad: () => {
    if (!useAuthStore.getState().accessToken) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthenticatedLayout,
});
