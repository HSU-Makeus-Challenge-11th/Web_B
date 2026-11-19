import { createFileRoute } from "@tanstack/react-router";
import { UpdatePage } from "../../pages/auth/update-page";

export const Route = createFileRoute("/(member)/_protected/mypage-update")({
  component: UpdatePage,
});
