import Link from "next/link";

export default function NotFound() {
  return (
    <main className="p-10 text-center">
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없어요.</h1>
      <Link className="mt-4 inline-block text-indigo-600 underline" href="/">
        영화 목록으로 돌아가기
      </Link>
    </main>
  );
}
