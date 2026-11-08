import { useNavigate } from "@tanstack/react-router";
import { useRef, useState, type SubmitEvent } from "react";
import { cn } from "../../utils/cn";
import { Icon } from "../common/icon";

interface SearchFormProps {
  defaultQuery?: string;
  variant: "hero" | "bar";
}

export function SearchForm({ defaultQuery = "", variant }: SearchFormProps) {
  const navigate = useNavigate({ from: "/search" });
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState(defaultQuery);
  const isHero = variant === "hero";

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({ search: nextQuery ? { query: nextQuery } : {} });
  }

  function handleClear() {
    setSearchText("");
    inputRef.current?.focus();
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-3 rounded-lg bg-surface pr-2 pl-4",
        isHero
          ? "h-[72px] border-[1.5px] border-fg pr-4 shadow-[0_8px_24px_rgba(23,25,30,0.08)]"
          : "h-14 border border-line",
      )}
    >
      <Icon name="search" className="text-fg-secondary" />
      <input
        ref={inputRef}
        type="search"
        aria-label="검색어"
        placeholder="예: 스파이더맨"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        className="h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-fg-tertiary [&::-webkit-search-cancel-button]:hidden"
      />
      {!isHero && searchText && (
        <button
          type="button"
          aria-label="검색어 지우기"
          onClick={handleClear}
          className="flex size-8 items-center justify-center rounded-md text-fg-secondary hover:bg-page"
        >
          <Icon name="close" />
        </button>
      )}
      <button
        type="submit"
        className="h-10 rounded-lg bg-fg px-4 text-sm font-semibold text-white hover:bg-fg/85"
      >
        {isHero ? "검색" : "다시 검색"}
      </button>
    </form>
  );
}
