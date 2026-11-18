import { createFileRoute } from "@tanstack/react-router";
import { EditProfilePage } from "../../../pages/members/edit-profile-page";

export const Route = createFileRoute("/(protected)/_authenticated/me_/edit")({ component: EditProfilePage });
