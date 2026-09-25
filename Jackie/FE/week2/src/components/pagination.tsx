import "./pagination.css";

export default function Pagination() {
  return (
    <div className="pagination">
      <div className="pagination-buttons">
        <button className="arrow-button">
          <img src="/icons/arrow-left.svg" alt="이전" />
        </button>

        <button className="page-button active">1</button>
        <button className="page-button">2</button>
        <button className="page-button">3</button>
        <button className="page-button">4</button>
        <button className="page-button">5</button>

        <button className="arrow-button">
          <img src="/icons/arrow-right.svg" alt="다음" />
        </button>
      </div>
    </div>
  );
}
