import { createFileRoute } from "@tanstack/react-router";
import { MemberApiPage } from "../pages/api/member-api-page";

export const Route = createFileRoute("/api-check")({
  component: MemberApiPage,
});
