import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "../../pages/profile/profile-page";

export const Route = createFileRoute("/(auth)/mypage/")({ component: ProfilePage });
