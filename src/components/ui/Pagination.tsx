import React, { useMemo } from "react";
import * as Icons from "../../assets/icons";
import Button from "./Button";
import styles from "../../styles/Users.module.scss";

interface PaginationProps {
  totalUsers: number;
  usersPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onUsersPerPageChange: (usersPerPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalUsers,
  usersPerPage,
  currentPage,
  onPageChange,
  onUsersPerPageChange,
}) => {
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  // Generate options for users per page (10, 50, 100, ..., 500)
  const usersPerPageOptions = useMemo(() => {
    const options = [10];
    for (let i = 50; i <= 500; i += 50) {
      options.push(i);
    }
    return options;
  }, []);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handleUsersPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newUsersPerPage = Number(event.target.value);
    onUsersPerPageChange(newUsersPerPage);
    // Reset to page 1 when changing users per page
    onPageChange(1);
  };

  return (
    <div className={styles.showingOption}>
      <div>
        <p className={styles.showing}>
          Showing{" "}
          <span>
            <select
              title="usersPerPage"
              value={usersPerPage}
              onChange={handleUsersPerPageChange}
              className={styles.current}
            >
              {usersPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>{" "}
            {/* <Icons.DownArrowIcon /> */}
          </span>{" "}
          out of {totalUsers}
        </p>
      </div>
      <div className={styles.move}>
        <Button
          variant="secondary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.arrow}
        >
          <Icons.LeftArrowIcon />
        </Button>
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            <Button
              className={currentPage === page ? styles.cPage : styles.number}
              key={index}
              variant={"primary"}
              onClick={() => onPageChange(Number(page))}
            >
              {page}
            </Button>
          )
        )}
        <Button
          variant="primary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.arrow}
        >
          <Icons.RightArrowIcon />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
