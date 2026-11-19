import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { login } from "../api/auth/login";
import { useAuthStore } from "../stores/auth-store";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: login,

    onSuccess: (response) => {
      const accessToken = response.result.accessToken;

      setAccessToken(accessToken);

      localStorage.setItem("umcine-access-token", accessToken);
      sessionStorage.setItem("umcine-access-token", accessToken);

      window.dispatchEvent(new Event("umcine-auth-changed"));

      queryClient.invalidateQueries({
        queryKey: ["members", "me"],
      });

      alert("로그인에 성공했어요.");

      void navigate({ to: "/" });
    },

    onError: (error) => {
      console.error("로그인 오류:", error);
      alert("로그인에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
