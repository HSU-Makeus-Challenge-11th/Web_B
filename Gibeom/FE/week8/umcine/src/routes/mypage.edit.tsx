import { createFileRoute } from "@tanstack/react-router";
import { ProfileEditPage } from "../pages/profile/profile-edit-page";

export const Route = createFileRoute("/mypage/edit")({ component: ProfileEditPage });
