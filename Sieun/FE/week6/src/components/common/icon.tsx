import { cn } from "../../utils/cn";

export type IconName =
  | "bookmark"
  | "bookmark-outline"
  | "chevron-left"
  | "chevron-right"
  | "arrow-right"
  | "close"
  | "movie"
  | "search"
  | "star";

interface IconProps {
  name: IconName;
  className?: string;
}

/** 검정색 SVG를 mask로 사용해 text 색상(currentColor)으로 아이콘을 칠해요. */
export function Icon({ name, className }: IconProps) {
  const url = `url(/icons/movie-icons/${name}.svg)`;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block size-5 shrink-0 bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]",
        className,
      )}
      style={{ maskImage: url, WebkitMaskImage: url }}
    />
  );
}
