import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { getApiErrorMessage } from "../api/api-error";
import { signup } from "../api/members/signup";

const SIGNUP_FAILURE_MESSAGE = "회원가입에 실패했어요. 다시 시도해 주세요.";

export function useSignupMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      if (!response.isSuccess) {
        alert(response.message || SIGNUP_FAILURE_MESSAGE);
        return;
      }
      alert(response.message);
      router.push("/login");
    },
    onError: (error) => {
      alert(getApiErrorMessage(error, SIGNUP_FAILURE_MESSAGE));
    },
  });
}
