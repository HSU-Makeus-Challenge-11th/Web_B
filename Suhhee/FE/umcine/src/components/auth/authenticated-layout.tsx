import { Navigate, Outlet } from "@tanstack/react-router";
import { useAuthStore } from "../../stores/auth-store";
import { useMeQuery } from "../../hooks/use-personal";

export function AuthenticatedLayout() {
  const token = useAuthStore(state => state.accessToken);
  const me = useMeQuery();
  if (!token) return <Navigate to="/login" />;
  if (me.isPending) return <main className="profile-page" role="status">내 정보를 불러오는 중이에요.</main>;
  if (me.isError) return <main className="profile-page" role="alert">내 정보를 불러오지 못했어요. <button onClick={() => void me.refetch()}>다시 시도</button></main>;
  return <Outlet />;
}
