import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="px-10 py-4">
      <nav className="flex gap-4 text-sm font-semibold">
        <Link to="/">영화</Link>
        <Link to="/search">검색</Link>
      </nav>
    </header>
  );
}
