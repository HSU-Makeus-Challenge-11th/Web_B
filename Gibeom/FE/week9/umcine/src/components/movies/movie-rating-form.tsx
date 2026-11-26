"use client";

import { useState } from "react";
import Link from "next/link";
import { getApiErrorMessage } from "../../api/api-error";
import type { Rating } from "../../api/ratings/get-member-ratings";
import {
  useCreateRatingMutation,
  useDeleteRatingMutation,
  useMemberRatingsQuery,
  useUpdateRatingMutation,
} from "../../hooks/use-ratings";
import { useAuthStore, useMemberId } from "../../stores/auth-store";
import { cn } from "../../utils/cn";

const MAX_COMMENT_LENGTH = 500;

interface MovieRatingFormProps {
  movieId: number;
}

export function MovieRatingForm({ movieId }: MovieRatingFormProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  // GET /members/{memberId}/ratings에 필요한 memberId는 토큰에서 읽음
  const memberId = useMemberId();
  const ratingsQuery = useMemberRatingsQuery(memberId);

  return (
    <aside
      className="col-span-full border-t border-[#e5e7eb] pt-6 min-[1025px]:col-auto min-[1025px]:border-t-0 min-[1025px]:border-l min-[1025px]:pt-0 min-[1025px]:pl-7"
      aria-labelledby="rating-title"
    >
      <h2 className="m-0 text-[17px] font-bold" id="rating-title">
        내 평점
      </h2>
      {!accessToken ? (
        <p className="mt-2 mb-0 text-xs text-[#8b95a5]">
          평점은 로그인 후 남길 수 있어요.
          <Link className="ml-1 font-semibold text-[#2463eb] no-underline" href="/login">
            로그인
          </Link>
        </p>
      ) : memberId === null ? (
        <p className="mt-2 mb-0 text-xs text-red-600" role="alert">회원 정보를 확인할 수 없어요. 다시 로그인해 주세요.</p>
      ) : ratingsQuery.isError ? (
        <p className="mt-2 mb-0 text-xs text-red-600" role="alert">
          {getApiErrorMessage(ratingsQuery.error, "평점을 불러오지 못했어요.")}
          <button className="ml-1 cursor-pointer underline" type="button" onClick={() => void ratingsQuery.refetch()}>
            다시 시도
          </button>
        </p>
      ) : ratingsQuery.isPending ? (
        <p className="mt-2 mb-0 text-xs text-[#8b95a5]">내 평점을 불러오는 중이에요.</p>
      ) : (
        <RatingEditor
          key={memberId}
          memberId={memberId}
          movieId={movieId}
          myRating={ratingsQuery.data.find((rating) => rating.movieId === movieId)}
        />
      )}
    </aside>
  );
}

interface RatingEditorProps {
  memberId: number;
  movieId: number;
  myRating: Rating | undefined;
}

function RatingEditor({ memberId, movieId, myRating }: RatingEditorProps) {
  const [score, setScore] = useState(myRating?.score ?? 0);
  const [comment, setComment] = useState(myRating?.comment ?? "");
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const createMutation = useCreateRatingMutation(memberId);
  const updateMutation = useUpdateRatingMutation(memberId);
  const deleteMutation = useDeleteRatingMutation(memberId);
  const isPending = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const handleError = (error: Error, fallback: string) => {
    setMessage({ text: getApiErrorMessage(error, fallback), isError: true });
  };

  function handleDelete() {
    if (!myRating || isPending) return;
    if (!confirm("남긴 평점을 삭제할까요?")) return;

    deleteMutation.mutate(myRating.ratingId, {
      onSuccess: (response) => {
        setScore(0);
        setComment("");
        setMessage({ text: response.message, isError: false });
      },
      onError: (error) => handleError(error, "평점을 삭제하지 못했어요. 다시 시도해 주세요."),
    });
  }

  function handleSave() {
    if (score < 1 || score > 5) {
      setMessage({ text: "별을 눌러 1~5점 중 하나를 선택해 주세요.", isError: true });
      return;
    }
    if (comment.trim().length > MAX_COMMENT_LENGTH) {
      setMessage({ text: `후기는 ${MAX_COMMENT_LENGTH}자 이하로 입력해 주세요.`, isError: true });
      return;
    }
    if (isPending) return;

    const body = { score, comment: comment.trim() };
    const options = {
      onSuccess: (response: { message: string }) => setMessage({ text: response.message, isError: false }),
      onError: (error: Error) => handleError(error, "평점을 저장하지 못했어요. 다시 시도해 주세요."),
    };
    if (myRating) {
      updateMutation.mutate({ ratingId: myRating.ratingId, body }, options);
    } else {
      createMutation.mutate({ movieId, ...body }, options);
    }
  }

  return (
    <>
      <p className="mt-1 mb-0 text-[11px] text-[#8b95a5]">
        {myRating ? "남긴 평점을 수정할 수 있어요." : "별을 눌러 평점을 남겨 보세요."}
      </p>
      <div
        className="mt-2.5 flex max-w-[220px] gap-1.5 min-[1025px]:max-w-none"
        role="radiogroup"
        aria-label="별점 선택"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            className={cn(
              "grid size-[34px] cursor-pointer place-items-center rounded-[5px] border bg-white p-0 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40",
              star <= score ? "border-[#2463eb]" : "border-[#e5e7eb]",
            )}
            key={star}
            type="button"
            role="radio"
            aria-checked={star === score}
            aria-label={`${star}점`}
            onClick={() => {
              setScore(star);
              setMessage(null);
            }}
          >
            <img className="size-[18px]" src={star <= score ? "/icons/star.svg" : "/icons/star-outline.svg"} alt="" />
          </button>
        ))}
      </div>
      <textarea
        className="mt-3 block h-20 w-full max-w-[520px] resize-y rounded-md border border-[#e5e7eb] bg-white p-2.5 text-xs text-[#171a21] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40 min-[1025px]:max-w-none"
        aria-label="평점 한 줄 리뷰"
        placeholder="영화를 보고 느낀 점을 남겨주세요."
        maxLength={MAX_COMMENT_LENGTH}
        value={comment}
        onChange={(event) => {
          setComment(event.target.value);
          setMessage(null);
        }}
      />
      {message && (
        <p className={cn("mt-2 mb-0 text-xs", message.isError ? "text-red-600" : "text-[#2463eb]")} role={message.isError ? "alert" : "status"}>
          {message.text}
        </p>
      )}
      <button
        className="mt-2.5 h-[38px] w-full max-w-[520px] cursor-pointer rounded-md border-0 bg-[#171a21] text-[13px] font-bold text-white hover:brightness-95 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40 disabled:cursor-not-allowed disabled:opacity-60 min-[1025px]:max-w-none"
        type="button"
        disabled={isPending}
        onClick={handleSave}
      >
        {createMutation.isPending || updateMutation.isPending ? "저장 중..." : myRating ? "평점 수정" : "평점 저장"}
      </button>
      {myRating && (
        <button
          className="mt-2 h-[34px] w-full max-w-[520px] cursor-pointer rounded-md border border-[#e5e7eb] bg-white text-xs font-semibold text-red-600 hover:bg-red-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-blue-500/40 disabled:cursor-not-allowed disabled:opacity-60 min-[1025px]:max-w-none"
          type="button"
          disabled={isPending}
          onClick={handleDelete}
        >
          {deleteMutation.isPending ? "삭제 중..." : "평점 삭제"}
        </button>
      )}
    </>
  );
}
