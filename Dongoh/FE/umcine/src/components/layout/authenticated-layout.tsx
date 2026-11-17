import { Navigate, Outlet } from "@tanstack/react-router";
import { useMeQuery } from "../../hooks/use-me-query";
import { useAuthStore } from "../../stores/auth-store";

export function AuthenticatedLayout() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useMeQuery();

  if (!accessToken) return <Navigate to="/login" />;
  if (meQuery.isPending) {
    return <main role="status" className="p-10 text-center">내 정보를 불러오는 중이에요.</main>;
  }
  if (meQuery.isError) {
    return (
      <main className="p-10 text-center">
        <p role="alert">내 정보를 불러오지 못했어요.</p>
        <button type="button" onClick={() => void meQuery.refetch()}>다시 시도</button>
      </main>
    );
  }

  return <Outlet />;
}
