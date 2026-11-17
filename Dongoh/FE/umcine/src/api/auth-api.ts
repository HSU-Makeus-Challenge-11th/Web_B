import { useAuthStore } from "../stores/auth-store";
import { apiClient } from "./api-client";

export const authApi = apiClient.extend({
  retry: 0,
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      ({ request, response }) => {
        const { accessToken, setAccessToken } = useAuthStore.getState();
        if (
          response.status === 401 &&
          request.headers.get("Authorization") === `Bearer ${accessToken}`
        ) {
          setAccessToken(null);
        }
      },
    ],
  },
});
