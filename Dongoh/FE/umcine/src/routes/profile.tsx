import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/pages/members/profile-page";

export const Route = createFileRoute("/profile")({ component: ProfilePage });
