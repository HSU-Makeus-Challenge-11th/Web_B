import ky from "ky";
import { env } from "../config/env";
import { useAuthStore } from "../stores/auth-store";

export const apiClient = ky.create({
  baseUrl: env.apiBaseUrl,
  hooks: {
    beforeRequest: [
      ({ request }) => {
        const accessToken = useAuthStore.getState().accessToken;

        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
  },
});
