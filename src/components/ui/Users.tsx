import React, { useState, useEffect, useCallback, useMemo } from "react";
import FilterDropdown from "./FilterDropdown";
import ActionDropdown from "./ActionDropdown";
import UserTable from "./UserTable";
import Pagination from "./Pagination";
import type { User, FilterState } from "../../types/user.types";
import { FilterUtils } from "../../utils/filterUtils";
import { UserStorageService } from "../../utils/LocalStorage";
import styles from "../../styles/Users.module.scss";

const Users: React.FC = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });
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
        
        // Get status updates from localStorage
        const statusUpdates = UserStorageService.getUserStatusUpdates();
        
        const formattedUsers: User[] = data.users.map((user: any, index: number) => ({
          id: user.id?.toString() || `${index + 1}`,
          organization: user.organization || "Unknown",
          username: user.personalInformation?.fullName?.split(" ")[0] || user.username || "Unknown",
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
          status: statusUpdates[user.id?.toString()] || user.status?.toLowerCase() || "unknown",
          personalInformation: user.personalInformation,
          educationAndEmployment: user.educationAndEmployment,
          socials: user.socials,
          guarantor: user.guarantor,
        }));
        
        setAllUsers(formattedUsers);
        setFilteredUsers(formattedUsers);
      } catch (error: any) {
        console.error("Fetch error:", error.message);
        setError("Failed to load users. Please check the JSON file or network.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Apply filters whenever activeFilters or allUsers change
  useEffect(() => {
    if (FilterUtils.isFilterEmpty(activeFilters)) {
      setFilteredUsers(allUsers);
    } else {
      const filtered = FilterUtils.applyFilters(allUsers, activeFilters);
      setFilteredUsers(filtered);
    }
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeFilters, allUsers]);

  // Handle filter application
  const handleFilter = useCallback((filters: FilterState) => {
    setActiveFilters(filters);
  }, []);

  // Handle status change
  const handleStatusChange = useCallback((userId: string, newStatus: string) => {
    // Update in localStorage
    UserStorageService.updateUserStatus(userId, newStatus);
    
    // Update in state
    setAllUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
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
      const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [filteredUsers.length, usersPerPage]
  );

  const handleUsersPerPageChange = useCallback((newUsersPerPage: number) => {
    setUsersPerPage(newUsersPerPage);
    setCurrentPage(1);
  }, []);

  // Get paginated users
  const paginatedUsers = useMemo(() => {
    return filteredUsers.slice(
      (currentPage - 1) * usersPerPage,
      currentPage * usersPerPage
    );
  }, [filteredUsers, currentPage, usersPerPage]);

  // Loading state
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading users...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>
          <h3>Error Loading Users</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  // Empty state
  if (filteredUsers.length === 0 && allUsers.length > 0) {
    return (
      <div className={styles.emptyState}>
        <p>No users found matching the current filters.</p>
        <button onClick={() => setActiveFilters({
          organization: "",
          username: "",
          email: "",
          date: "",
          phoneNumber: "",
          status: "",
        })}>
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className={styles.usersContainer}>
      <UserTable
        users={paginatedUsers}
        onFilterClick={handleFilterClick}
        onActionClick={handleActionClick}
      />
      
      <FilterDropdown
        isOpen={filterDropdown.isOpen}
        onClose={closeFilterDropdown}
        position={filterDropdown.position}
        onFilter={handleFilter}
        users={allUsers}
      />
      
      <ActionDropdown
        isOpen={actionDropdown.isOpen}
        onClose={closeActionDropdown}
        position={actionDropdown.position}
        userId={actionDropdown.userId}
        onStatusChange={handleStatusChange}
      />
      
      <Pagination
        totalUsers={filteredUsers.length}
        usersPerPage={usersPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onUsersPerPageChange={handleUsersPerPageChange}
      />
    </div>
  );
};

export default Users;