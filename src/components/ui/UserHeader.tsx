import React from "react";
import * as Icons from "../../assets/icons";
import Button from "./Button";
import styles from "../../styles/useDetail.module.scss";

interface UserDetailsData {
  name: string;
  id: string;
  avatar: string;
  tier: number;
  bankBalance: string;
  bankDetails: string;
  status: string;
}

interface UserHeaderProps {
  userData: UserDetailsData;
  onStatusUpdate?: (userId: string, status: string) => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({
  userData,
  onStatusUpdate,
}) => {
  const handleBackClick = (): void => {
    window.history.back();
  };

  const handleBlacklistUser = (): void => {
    if (onStatusUpdate) {
      onStatusUpdate(userData.id, "blacklisted");
    }
    console.log(`User ${userData.name} has been blacklisted`);
  };

  const handleActivateUser = (): void => {
    if (onStatusUpdate) {
      onStatusUpdate(userData.id, "active");
    }
    console.log(`User ${userData.name} has been activated`);
  };

  const isBlacklisted = userData.status === "blacklisted";
  const isActive = userData.status === "active";

  return (
    <div className={styles.nav}>
      <div>
        <p className={styles.back} onClick={handleBackClick}>
          <Icons.BackArrowIcon /> Back to Users
        </p>
        <p className={styles.user}>User Details</p>
      </div>
      <div className={styles.btn}>
        <Button
          className={`${styles.blacklist} ${
            isBlacklisted ? styles.disabled : ""
          }`}
          variant="secondary"
          onClick={handleBlacklistUser}
          disabled={isBlacklisted}
        >
          {isBlacklisted ? "USER BLACKLISTED" : "BLACKLIST USER"}
        </Button>
        <Button
          className={`${styles.activate} ${isActive ? styles.disabled : ""}`}
          variant="secondary"
          onClick={handleActivateUser}
          disabled={isActive}
        >
          {isActive ? "USER ACTIVE" : "ACTIVATE USER"}
        </Button>
      </div>
    </div>
  );
};

export default UserHeader;
