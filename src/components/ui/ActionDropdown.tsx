import React, { useRef, useEffect } from "react";
import * as Icons from "../../assets/icons";
import styles from "../../styles/ActionDropdown.module.scss";

interface ActionDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
  userId: string;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  isOpen,
  onClose,
  position,
  userId,
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

  const handleViewDetails = () => {
    console.log("View details for user:", userId);
    // Implement view details logic
    onClose();
  };

  const handleBlacklistUser = () => {
    console.log("Blacklist user:", userId);
    // Implement blacklist logic
    onClose();
  };

  const handleActivateUser = () => {
    console.log("Activate user:", userId);
    // Implement activate logic
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
          className={styles.actionItem}
          type="button"
        >
          <Icons.BlacklistIcon className={styles.actionIcon} />
          <span>Blacklist User</span>
        </button>

        <button
          onClick={handleActivateUser}
          className={styles.actionItem}
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
