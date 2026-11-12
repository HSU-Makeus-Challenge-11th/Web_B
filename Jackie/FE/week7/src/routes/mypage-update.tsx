import { createFileRoute } from "@tanstack/react-router";
import { UpdatePage } from "../pages/auth/update-page";

export const Route = createFileRoute("/mypage-update")({
  component: UpdatePage,
});
