import React, { useRef, useEffect } from "react";
import * as Icons from "../../assets/icons";
import type { ActionDropdownProps } from "../../types/user.types";
import styles from "../../styles/ActionDropdown.module.scss";

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  isOpen,
  onClose,
  position,
  userId,
  onStatusChange,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleViewDetails = (): void => {
    // Navigate to user details page
    window.location.href = `/user-details/${userId}`;
    onClose();
  };

  const handleBlacklistUser = (): void => {
    const newStatus = "blacklisted";
    onStatusChange(userId, newStatus);

    // Show confirmation message
    console.log(`User ${userId} has been blacklisted`);

    onClose();
  };

  const handleActivateUser = (): void => {
    const newStatus = "active";
    onStatusChange(userId, newStatus);

    // Show confirmation message
    console.log(`User ${userId} has been activated`);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={styles.actionDropdown}
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className={styles.actionContent}>
        <button
          onClick={handleViewDetails}
          className={styles.actionItem}
          type="button"
        >
          <Icons.ViewIcon className={styles.actionIcon} />
          <span>View Details</span>
        </button>

        <button
          onClick={handleBlacklistUser}
          className={`${styles.actionItem} ${styles.dangerAction}`}
          type="button"
        >
          <Icons.BlacklistIcon className={styles.actionIcon} />
          <span>Blacklist User</span>
        </button>

        <button
          onClick={handleActivateUser}
          className={`${styles.actionItem} ${styles.successAction}`}
          type="button"
        >
          <Icons.ActivateIcon className={styles.actionIcon} />
          <span>Activate User</span>
        </button>
      </div>
    </div>
  );
};

export default ActionDropdown;
