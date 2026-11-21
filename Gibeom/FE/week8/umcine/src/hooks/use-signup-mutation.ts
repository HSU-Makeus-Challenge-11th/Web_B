import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getApiErrorMessage } from "../api/api-error";
import { signup } from "../api/members/signup";
import { useMemberStore } from "../stores/member-store";

const SIGNUP_FAILURE_MESSAGE = "회원가입에 실패했어요. 다시 시도해 주세요.";

export function useSignupMutation() {
  const setMemberId = useMemberStore((state) => state.setMemberId);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      if (!response.isSuccess) {
        alert(response.message || SIGNUP_FAILURE_MESSAGE);
        return;
      }
      // 평점 API에서 쓰도록 회원가입 응답의 memberId를 보관
      setMemberId(response.result.memberId);
      alert(response.message);
      navigate({ to: "/login" });
    },
    onError: (error) => {
      alert(getApiErrorMessage(error, SIGNUP_FAILURE_MESSAGE));
    },
  });
}
