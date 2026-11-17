import { createFileRoute } from "@tanstack/react-router";
import { ProfileEditPage } from "../../../pages/members/profile-edit-page";

export const Route = createFileRoute(
  "/(protected)/_authenticated/profile-edit",
)({ component: ProfileEditPage });
