import { Navigate, Outlet } from "@tanstack/react-router";
import { useMeQuery } from "../../hooks/use-me-query";
import { useAuthStore } from "../../stores/auth-store";

const statusClass =
  "grid min-h-[420px] flex-1 place-items-center bg-[#f6f7f9] text-lg font-bold text-[#555d6c]";

export function AuthenticatedLayout() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useMeQuery();

  // 페이지를 보는 중 401로 토큰이 지워지면 로그인 화면으로 이동
  if (!accessToken) return <Navigate to="/login" />;

  // 하위 페이지가 내 정보를 바로 쓸 수 있도록 조회가 끝난 뒤 렌더링
  if (meQuery.isPending) {
    return <main className={statusClass} role="status">내 정보를 불러오는 중이에요.</main>;
  }
  if (meQuery.isError) {
    return (
      <main className={statusClass}>
        <p className="m-0" role="alert">
          내 정보를 불러오지 못했어요.
          <button className="ml-2 cursor-pointer text-base underline" type="button" onClick={() => void meQuery.refetch()}>
            다시 시도
          </button>
        </p>
      </main>
    );
  }

  return <Outlet />;
}
