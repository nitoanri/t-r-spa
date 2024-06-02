import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

class Pagination extends React.Component<PaginationProps> {
  render() {
    const { currentPage, totalPages, onPageChange } = this.props;

    const renderPageNumbers = () => {
      const pageNumbers = [];
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);

      // Первая страница
      pageNumbers.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className={currentPage === 1 ? "current" : ""}
        >
          1
        </button>
      );

      // Троеточие после первой страницы, если необходимо
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis">...</span>);
      }

      // Диапазон страниц от startPage до endPage
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={currentPage === i ? "current" : ""}
          >
            {i}
          </button>
        );
      }

      // Троеточие перед последней страницей, если необходимо
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis">...</span>);
      }

      // Последняя страница
      if (totalPages > 1) {
        pageNumbers.push(
          <button
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            className={currentPage === totalPages ? "current" : ""}
          >
            {totalPages}
          </button>
        );
      }

      return pageNumbers;
    };

    return <div className="pagination">{renderPageNumbers()}</div>;
  }
}

export default Pagination;
