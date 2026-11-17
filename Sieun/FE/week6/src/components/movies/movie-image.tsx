import { cn } from "../../utils/cn";

interface MovieImageProps {
  src: string | null;
  alt: string;
  className?: string;
}

/** 이미지 URL이 없으면 같은 크기의 회색 영역에 안내 문구를 보여 줘요. */
export function MovieImage({ src, alt, className }: MovieImageProps) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt || "이미지 없음"}
        className={cn("flex items-center justify-center bg-line text-sm text-fg-secondary", className)}
      >
        이미지 없음
      </div>
    );
  }

  return <img src={src} alt={alt} className={cn("object-cover", className)} />;
}
