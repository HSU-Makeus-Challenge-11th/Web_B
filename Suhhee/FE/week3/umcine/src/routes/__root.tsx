import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-[#f6f7f9] text-[#17191e]">
      <Header />
      <Outlet />
    </div>
  ),
  notFoundComponent: () => (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-8 lg:px-20">
      페이지를 찾을 수 없어요.
    </main>
  ),
});
