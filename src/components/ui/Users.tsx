import React, { useState, useEffect, useCallback } from "react";
import FilterDropdown from "./FilterDropdown";
import ActionDropdown from "./ActionDropdown";
import UserTable from "./UserTable";
import Pagination from "./Pagination";
import styles from "../../styles/Users.module.scss";

interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10); // Default to 10
  const [filterDropdown, setFilterDropdown] = useState({
    isOpen: false,
    position: { top: 0, left: 0 },
  });
  const [actionDropdown, setActionDropdown] = useState({
    isOpen: false,
    position: { top: 0, left: 0 },
    userId: "",
  });

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/data/user.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const formattedUsers = data.users.map((user: any, index: number) => ({
          id: user.id || `${index + 1}`,
          organization: user.organization || "Unknown",
          username:
            user.personalInformation?.fullName?.split(" ")[0] || "Unknown",
          email: user.email || "N/A",
          phoneNumber: user.phoneNumber || "N/A",
          dateJoined: user.dateJoined
            ? new Date(user.dateJoined).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "N/A",
          status: user.status ? user.status.toLowerCase() : "unknown",
        }));
        setUsers(formattedUsers);
      } catch (error: any) {
        console.error("Fetch error:", error.message);
        setError(
          "Failed to load users. Please check the JSON file or network."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleFilterClick = useCallback(
    (event: React.MouseEvent, index: number) => {
      event.preventDefault();
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      setFilterDropdown({
        isOpen: !filterDropdown.isOpen,
        position: {
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX,
        },
      });
    },
    [filterDropdown.isOpen]
  );

  const handleActionClick = useCallback(
    (event: React.MouseEvent, userId: string, index: number) => {
      event.preventDefault();
      event.stopPropagation();
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      setActionDropdown({
        isOpen: !actionDropdown.isOpen,
        position: {
          top: rect.bottom + window.scrollY + 8,
          left: rect.right + window.scrollX - 180,
        },
        userId,
      });
    },
    [actionDropdown.isOpen]
  );

  const closeFilterDropdown = useCallback(() => {
    setFilterDropdown((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const closeActionDropdown = useCallback(() => {
    setActionDropdown((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= Math.ceil(users.length / usersPerPage)) {
        setCurrentPage(page);
      }
    },
    [users.length, usersPerPage]
  );

  const handleUsersPerPageChange = useCallback((newUsersPerPage: number) => {
    setUsersPerPage(newUsersPerPage);
    setCurrentPage(1); // Reset to page 1
  }, []);

  return (
    <>
      {loading && <div>Loading users...</div>}
      {error && <div className={styles.error}>Error: {error}</div>}
      {!loading && !error && (
        <>
          <UserTable
            users={users.slice(
              (currentPage - 1) * usersPerPage,
              currentPage * usersPerPage
            )}
            onFilterClick={handleFilterClick}
            onActionClick={handleActionClick}
          />
          <FilterDropdown
            isOpen={filterDropdown.isOpen}
            onClose={closeFilterDropdown}
            position={filterDropdown.position}
          />
          <ActionDropdown
            isOpen={actionDropdown.isOpen}
            onClose={closeActionDropdown}
            position={actionDropdown.position}
            userId={actionDropdown.userId}
          />
          <Pagination
            totalUsers={users.length}
            usersPerPage={usersPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onUsersPerPageChange={handleUsersPerPageChange}
          />
        </>
      )}
    </>
  );
};

export default Users;
