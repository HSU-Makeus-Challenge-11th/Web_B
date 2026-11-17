import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "../../../pages/members/profile-page";

export const Route = createFileRoute(
  "/(protected)/_authenticated/profile",
)({ component: ProfilePage });
