import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  createRating,
  deleteRating,
  getMemberRatings,
  updateRating,
  type Rating,
  type RatingInput,
} from "../api/ratings";
import { getRequestError } from "../api/response";
import { getMemberId, useAuthStore } from "../stores/auth-store";
import { cn } from "../utils/cn";

export function MovieRating({ movieId }: { movieId: number }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const memberId = getMemberId(accessToken);
  const [notice, setNotice] = useState("");
  const ratingsQuery = useQuery({
    queryKey: ["members", memberId, "ratings"],
    queryFn: ({ signal }) => getMemberRatings(memberId!, signal),
    enabled: Boolean(accessToken && memberId),
    retry: false,
  });

  if (!accessToken) {
    return (
      <aside className="border-l border-gray-200 pl-7 max-[1000px]:col-span-full max-[1000px]:border-t max-[1000px]:border-l-0 max-[1000px]:pt-[22px] max-[1000px]:pl-0">
        <h2 className="mb-2 text-lg font-black text-gray-900">내 평점</h2>
        <p className="text-sm text-gray-500">
          <Link to="/login" className="font-bold text-indigo-600 underline">로그인</Link>하고 평점을 남겨보세요.
        </p>
      </aside>
    );
  }

  if (!memberId) return <p role="alert">회원 번호를 확인할 수 없어요.</p>;
  if (ratingsQuery.isPending) return <p role="status">내 평점을 불러오는 중이에요.</p>;
  if (ratingsQuery.isError) {
    return (
      <div role="alert">
        <p>{getRequestError(ratingsQuery.error)}</p>
        <button type="button" onClick={() => void ratingsQuery.refetch()}>평점 다시 조회</button>
      </div>
    );
  }

  const rating = ratingsQuery.data.find((item) => item.movieId === movieId);
  return (
    <RatingForm
      key={`${movieId}:${rating?.ratingId ?? "new"}:${rating?.updatedAt ?? "new"}`}
      movieId={movieId}
      memberId={memberId}
      rating={rating}
      notice={notice}
      setNotice={setNotice}
    />
  );
}

interface RatingFormProps {
  movieId: number;
  memberId: number;
  rating?: Rating;
  notice: string;
  setNotice: (notice: string) => void;
}

function RatingForm({ movieId, memberId, rating, notice, setNotice }: RatingFormProps) {
  const [score, setScore] = useState(rating?.score ?? 0);
  const [comment, setComment] = useState(rating?.comment ?? "");
  const accessToken = useAuthStore((state) => state.accessToken);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (action: { type: "save"; body: RatingInput } | { type: "delete" }) => {
      if (action.type === "delete") {
        if (!rating) throw new Error("삭제할 평점이 없어요.");
        await deleteRating(rating.ratingId);
        return "평점을 삭제했어요.";
      }
      if (rating) {
        await updateRating(rating.ratingId, action.body);
        return "평점을 수정했어요.";
      }
      await createRating({ movieId, ...action.body });
      return "평점을 등록했어요.";
    },
    onSuccess: async (message) => {
      if (useAuthStore.getState().accessToken !== accessToken) return;
      setNotice(message);
      await queryClient.invalidateQueries({ queryKey: ["members", memberId, "ratings"] });
    },
  });
  const canSubmit = score >= 1 && score <= 5 && comment.length <= 500;

  return (
    <aside className="border-l border-gray-200 pl-7 max-[1000px]:col-span-full max-[1000px]:border-t max-[1000px]:border-l-0 max-[1000px]:pt-[22px] max-[1000px]:pl-0">
      <h2 className="mb-1 text-lg font-black text-gray-900">내 평점</h2>
      <p className="mb-3.5 text-[13px] text-gray-400">별점을 주고 한줄평을 남겨보세요.</p>
      <form onSubmit={(event) => {
        event.preventDefault();
        if (!canSubmit || mutation.isPending) return;
        mutation.mutate({ type: "save", body: { score, comment: comment.trim() } });
      }}>
        <fieldset disabled={mutation.isPending}>
          <legend className="sr-only">별점 선택</legend>
          <div className="mb-3.5 flex gap-[7px]">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                aria-label={`${star}점`}
                aria-pressed={score === star}
                onClick={() => { setScore(star); setNotice(""); mutation.reset(); }}
                className={cn(
                  "inline-flex size-7 items-center justify-center rounded-md border bg-white",
                  star <= score ? "border-amber-400" : "border-gray-200",
                )}
              >
                <img src={`/icons/movie-icons/${star <= score ? "star" : "star-outline"}.svg`} alt="" aria-hidden="true" className="size-[15px]" />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            maxLength={500}
            aria-label="한줄평"
            placeholder="한줄평 또는 느낀 점을 남겨보세요."
            onChange={(event) => { setComment(event.target.value); setNotice(""); mutation.reset(); }}
            className="block min-h-[116px] w-full resize-y rounded-md border border-gray-200 bg-white p-3 text-[13px] text-gray-900 outline-blue-600"
          />
          <p className="mt-1 text-right text-xs text-gray-400">{comment.length}/500</p>
          <div className="mt-3.5 flex gap-2">
            <button className="w-full rounded-md bg-gray-900 p-3 text-[13px] font-black text-white disabled:opacity-50" type="submit" disabled={!canSubmit}>
              {mutation.isPending ? "처리 중" : rating ? "평점 수정" : "평점 저장"}
            </button>
            {rating && (
              <button className="shrink-0 rounded-md border border-gray-300 px-3 text-xs font-bold" type="button" onClick={() => mutation.mutate({ type: "delete" })}>
                삭제
              </button>
            )}
          </div>
          {mutation.isError && <p className="mt-2 text-sm text-red-600" role="alert">{getRequestError(mutation.error)}</p>}
          {notice && <p className="mt-2 text-sm text-green-700" role="status">{notice}</p>}
        </fieldset>
      </form>
    </aside>
  );
}
