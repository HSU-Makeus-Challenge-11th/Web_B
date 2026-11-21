import { Navigate, Outlet } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/auth-store";

export function AuthLayout() {
  const accessToken = useAuthStore((state) => state.accessToken);

  // 페이지를 보는 중 401로 토큰이 지워지면 로그인 화면으로 이동
  if (!accessToken) return <Navigate to="/login" />;

  return <Outlet />;
}
