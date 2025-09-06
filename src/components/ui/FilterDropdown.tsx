import React, { useState, useRef, useEffect } from "react";
import * as Icons from "../../assets/icons";
import Button from "../ui/Button";
import type { FilterDropdownProps, FilterState } from "../../types/user.types";
import styles from "../../styles/FilterDropdown.module.scss";

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  isOpen,
  onClose,
  position,
  onFilter,
  users,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get organizations from users data
  const uniqueOrganizations = React.useMemo(() => {
    const orgs = [...new Set(users.map((user) => user.organization))];
    return orgs.filter((org) => org && org !== "Unknown").sort();
  }, [users]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleInputChange = (field: keyof FilterState, value: string): void => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleReset = (): void => {
    const emptyFilters: FilterState = {
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    };
    setFilters(emptyFilters);
    onFilter(emptyFilters);
    onClose();
  };

  const handleFilter = (): void => {
    onFilter(filters);
    onClose();
  };

  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch {
      return dateString;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={styles.filterDropdown}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className={styles.filterContent}>
        <div className={styles.filterGroup}>
          <label className={styles.label}>Organization</label>
          <select
            title="organization"
            value={filters.organization}
            onChange={(e) => handleInputChange("organization", e.target.value)}
            className={styles.select}
          >
            <option value="">Select Organization</option>
            {uniqueOrganizations.map((org) => (
              <option key={org} value={org}>
                {org}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Username</label>
          <input
            type="text"
            placeholder="User"
            value={filters.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Email"
            value={filters.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Date</label>
          <div className={styles.dateInputWrapper}>
            <input
              title="date"
              type="date"
              value={formatDateForInput(filters.date)}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className={styles.dateInput}
            />
            <Icons.CalendarIcon className={styles.calendarIcon} />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="tel"
            placeholder="Phone Number"
            value={filters.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.label}>Status</label>
          <select
            title="status"
            value={filters.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className={styles.select}
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="blacklisted">Blacklisted</option>
          </select>
        </div>

        <div className={styles.buttonGroup}>
          <Button
            variant="secondary"
            onClick={handleReset}
            className={styles.resetButton}
          >
            Reset
          </Button>
          <Button
            variant="primary"
            onClick={handleFilter}
            className={styles.filterButton}
          >
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
