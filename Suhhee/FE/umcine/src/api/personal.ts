import { membersClient, type ApiResponse } from "./members";
import { useAuthStore } from "../stores/auth-store";

const authApi = membersClient.extend({ hooks: {
  beforeRequest: [({ request }) => {
    const token = useAuthStore.getState().accessToken;
    if (token) request.headers.set("Authorization", `Bearer ${token}`);
  }],
  afterResponse: [({ response }) => {
    if (response.status === 401) useAuthStore.getState().setAccessToken(null);
  }],
} });

export interface MemberInfo { email: string; nickname: string; createdAt: string }
export interface Favorite { favoriteId: number; movieId: number; createdAt: string }
export interface Rating { ratingId: number; movieId: number; score: number; comment: string | null }
export interface RatingBody { score: number; comment: string }

export const login = (body: { email: string; password: string }) => membersClient.post("auth/login", { json: body })
  .json<ApiResponse<{ nickname: string; accessToken: string }>>();
export const getMe = async (signal?: AbortSignal) => (await authApi.get("members/me", { signal }).json<ApiResponse<MemberInfo>>()).result;
export const updateMe = async (nickname: string) => (await authApi.patch("members/me", { json: { nickname } }).json<ApiResponse<MemberInfo>>()).result;
export const getFavorites = async (signal?: AbortSignal) => (await authApi.get("favorites", { signal }).json<ApiResponse<Favorite[]>>()).result;
export const getFavoriteStatus = async (movieId: number, signal?: AbortSignal) => (await authApi.get(`favorites/${movieId}`, { signal }).json<ApiResponse<{ isFavorite: boolean }>>()).result;
export const addFavorite = (movieId: number) => authApi.post("favorites", { json: { movieId } }).json<ApiResponse<Favorite>>();
export const deleteFavorite = (movieId: number) => authApi.delete(`favorites/${movieId}`).json<ApiResponse<null>>();
export const getRatings = async (memberId: number, signal?: AbortSignal) => (await authApi.get(`members/${memberId}/ratings`, { signal }).json<ApiResponse<Rating[]>>()).result;
export const createRating = (body: RatingBody & { movieId: number }) => authApi.post("ratings", { json: body }).json<ApiResponse<Rating>>();
export const updateRating = (ratingId: number, body: RatingBody) => authApi.patch(`ratings/${ratingId}`, { json: body }).json<ApiResponse<Rating>>();
export const deleteRating = (ratingId: number) => authApi.delete(`ratings/${ratingId}`).json<ApiResponse<null>>();
