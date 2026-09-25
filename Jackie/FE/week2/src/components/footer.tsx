import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <img src="/images/logos/tmdb-logo.svg" />
      <p>
        This product uses the TMDB API but is not endorsed or certified by    
        <span className="TMDB">TMDB.</span>
      </p>
    </footer>
  );
}