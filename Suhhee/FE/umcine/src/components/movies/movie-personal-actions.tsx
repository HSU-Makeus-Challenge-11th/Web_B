import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMemberId, useFavoriteStatusQuery, useFavoriteMutation, useRatingsQuery, useRatingMutation } from "../../hooks/use-personal";
import { getApiError } from "../../api/members";
import type { Rating } from "../../api/personal";

export function FavoriteButton({ movieId }: { movieId: number }) {
  const memberId = useMemberId();
  const navigate = useNavigate();
  const query = useFavoriteStatusQuery(movieId);
  const mutation = useFavoriteMutation(movieId);
  const isFavorite = query.data?.isFavorite ?? false;
  return <div className="mt-4">
    <button className="primary-button" type="button" aria-pressed={isFavorite}
      disabled={!!memberId && (query.isPending || query.isError || mutation.isPending)}
      onClick={() => { if (!memberId) { void navigate({ to: "/login" }); return; } mutation.mutate(isFavorite); }}>
      {mutation.isPending ? "처리 중" : isFavorite ? "즐겨찾기 해제" : "즐겨찾기"}
    </button>
    {(query.isError || mutation.isError) && <p role="alert" className="field-error">{getApiError(query.error ?? mutation.error)} <button onClick={() => void query.refetch()}>다시 시도</button></p>}
  </div>;
}

export function MovieRating({ movieId }: { movieId: number }) {
  const memberId = useMemberId();
  const query = useRatingsQuery();
  if (!memberId) return <p className="mt-4"><Link to="/login">로그인 후 별점과 한줄평을 남겨보세요.</Link></p>;
  if (query.isPending) return <p role="status">내 평점을 불러오는 중이에요.</p>;
  if (query.isError) return <p role="alert">평점을 불러오지 못했어요. <button onClick={() => void query.refetch()}>다시 시도</button></p>;
  const rating = query.data.find(item => item.movieId === movieId);
  return <RatingForm key={`${memberId}:${rating?.ratingId}:${rating?.score}:${rating?.comment}`} movieId={movieId} rating={rating} />;
}

function RatingForm({ movieId, rating }: { movieId: number; rating?: Rating }) {
  const [score, setScore] = useState(rating?.score ?? 0);
  const [comment, setComment] = useState(rating?.comment ?? "");
  const mutation = useRatingMutation(movieId, rating);
  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (score < 1 || mutation.isPending) return;
    mutation.mutate({ type: "save", body: { score, comment } });
  }
  return <form onSubmit={submit} className="mt-4" aria-busy={mutation.isPending}>
    <p className="field-hint">{rating ? `등록된 평점: ${rating.score}점 · ${rating.comment ?? ""}` : "아직 등록한 평점이 없어요."}</p>
    <div className="mt-3 flex gap-2" role="group" aria-label="별점 선택">
      {[1, 2, 3, 4, 5].map(value => <button key={value} type="button" aria-label={`${value}점`} aria-pressed={score === value}
        className={`rounded-lg border p-2 ${value <= score ? "bg-[#17191e] text-white" : "bg-white"}`}
        disabled={mutation.isPending} onClick={() => setScore(value)}>★</button>)}
    </div>
    <label htmlFor="movie-review" className="mt-3 block text-sm">한줄평</label>
    <textarea id="movie-review" className="mt-1 h-28 w-full rounded-lg border bg-white p-3 text-sm" maxLength={500}
      value={comment} disabled={mutation.isPending} onChange={event => setComment(event.target.value)} placeholder="한줄평을 입력해 주세요." />
    <span className="field-hint">{comment.length}/500</span>
    <div className="mt-3 flex gap-3">
      <button className="primary-button" type="submit" disabled={!score || mutation.isPending}>{mutation.isPending ? "저장 중" : rating ? "평점 수정" : "평점 등록"}</button>
      {rating && <button type="button" disabled={mutation.isPending} onClick={() => mutation.mutate({ type: "delete" })}>평점 삭제</button>}
    </div>
    {mutation.isError && <p role="alert" className="field-error">{getApiError(mutation.error)}</p>}
    {mutation.isSuccess && <p role="status" className="form-success">{mutation.data}</p>}
  </form>;
}
