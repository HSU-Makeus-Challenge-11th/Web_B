import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRating } from "../api/ratings/create-rating";
import { deleteRating } from "../api/ratings/delete-rating";
import { getMemberRatings, type Rating } from "../api/ratings/get-member-ratings";
import { updateRating, type UpdateRatingRequest } from "../api/ratings/update-rating";

const ratingKeys = {
  member: (memberId: number) => ["members", memberId, "ratings"] as const,
};

export function useMemberRatingsQuery(memberId: number | null) {
  return useQuery({
    queryKey: ratingKeys.member(memberId ?? 0),
    queryFn: () => getMemberRatings(memberId as number),
    enabled: memberId !== null,
  });
}

// 등록·수정 응답에 변경된 평점이 담겨 있어 그 값으로 목록 캐시를 직접 갱신
export function useCreateRatingMutation(memberId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRating,
    onSuccess: (response) => {
      queryClient.setQueryData<Rating[]>(ratingKeys.member(memberId), (prev) =>
        prev ? [response.result, ...prev] : prev,
      );
    },
  });
}

export function useUpdateRatingMutation(memberId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ratingId, body }: { ratingId: number; body: UpdateRatingRequest }) =>
      updateRating(ratingId, body),
    onSuccess: (response) => {
      queryClient.setQueryData<Rating[]>(ratingKeys.member(memberId), (prev) =>
        prev?.map((rating) =>
          rating.ratingId === response.result.ratingId ? response.result : rating,
        ),
      );
    },
  });
}

export function useDeleteRatingMutation(memberId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRating,
    onSuccess: (_response, ratingId) => {
      queryClient.setQueryData<Rating[]>(ratingKeys.member(memberId), (prev) =>
        prev?.filter((rating) => rating.ratingId !== ratingId),
      );
    },
  });
}
