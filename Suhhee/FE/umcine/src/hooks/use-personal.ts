import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import * as api from "../api/personal";
import { signup } from "../api/members";
import { memberIdFromToken, useAuthStore } from "../stores/auth-store";

export function useMemberId() {
  return memberIdFromToken(useAuthStore(state => state.accessToken));
}
export function useMeQuery() {
  const memberId = useMemberId();
  const token = useAuthStore(state => state.accessToken);
  return useQuery({ queryKey: ["members", "me", memberId], queryFn: ({ signal }) => api.getMe(signal), enabled: !!token, retry: false });
}
export function useSignupMutation() {
  return useMutation({ mutationFn: signup });
}
export function useLoginMutation() {
  const navigate = useNavigate();
  const client = useQueryClient();
  return useMutation({ mutationFn: api.login, onSuccess: async response => {
    useAuthStore.getState().setAccessToken(response.result.accessToken);
    await client.invalidateQueries({ queryKey: ["members", "me"] });
    await navigate({ to: "/" });
  } });
}
export function useUpdateMeMutation() {
  const memberId = useMemberId();
  const client = useQueryClient();
  return useMutation({ mutationFn: api.updateMe, onSuccess: data => {
    client.setQueryData(["members", "me", memberId], data);
  } });
}
export function useFavoritesQuery() {
  const memberId = useMemberId();
  return useQuery({ queryKey: ["favorites", "list", memberId], queryFn: ({ signal }) => api.getFavorites(signal), enabled: !!memberId, retry: false });
}
export function useFavoriteStatusQuery(movieId: number) {
  const memberId = useMemberId();
  return useQuery({ queryKey: ["favorites", "detail", memberId, movieId], queryFn: ({ signal }) => api.getFavoriteStatus(movieId, signal), enabled: !!memberId && movieId > 0, retry: false });
}
export function useFavoriteMutation(movieId: number) {
  const memberId = useMemberId();
  const client = useQueryClient();
  return useMutation({ mutationFn: async (wasFavorite: boolean) => {
    if (wasFavorite) await api.deleteFavorite(movieId); else await api.addFavorite(movieId);
    return !wasFavorite;
  }, onSuccess: async isFavorite => {
    client.setQueryData(["favorites", "detail", memberId, movieId], { isFavorite });
    await client.invalidateQueries({ queryKey: ["favorites", "list", memberId] });
  }, onError: () => client.invalidateQueries({ queryKey: ["favorites"] }) });
}
export function useRatingsQuery() {
  const memberId = useMemberId();
  return useQuery({ queryKey: ["members", memberId, "ratings"], queryFn: ({ signal }) => api.getRatings(memberId!, signal), enabled: !!memberId, retry: false });
}
export function useRatingMutation(movieId: number, rating?: api.Rating) {
  const memberId = useMemberId();
  const client = useQueryClient();
  return useMutation({ mutationFn: async (action: { type: "save"; body: api.RatingBody } | { type: "delete" }) => {
    if (action.type === "delete") {
      if (!rating) throw new Error("삭제할 평점이 없어요.");
      await api.deleteRating(rating.ratingId); return "평점을 삭제했어요.";
    }
    if (rating) { await api.updateRating(rating.ratingId, action.body); return "평점을 수정했어요."; }
    await api.createRating({ movieId, ...action.body }); return "평점을 등록했어요.";
  }, onSuccess: () => client.invalidateQueries({ queryKey: ["members", memberId, "ratings"] }) });
}
