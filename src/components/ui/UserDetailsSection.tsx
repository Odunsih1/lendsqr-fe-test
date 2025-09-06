import React from "react";
import InfoGrid from "./InfoGrid";
import type { UserDetailsSectionProps } from "../../types/user.types";
import styles from "../../styles/useDetail.module.scss";

const UserDetailsSection: React.FC<UserDetailsSectionProps> = ({
  personalInfo,
  educationInfo,
  socialsInfo,
  guarantorInfo,
}) => {
  return (
    <div className={styles.infoSection}>
      <InfoGrid
        title="Personal Information"
        data={personalInfo}
        maxColumns={5}
      />

      <InfoGrid
        title="Education and Employment"
        data={educationInfo}
        maxColumns={4}
      />

      <InfoGrid title="Socials" data={socialsInfo} maxColumns={4} />

      <InfoGrid title="Guarantor" data={guarantorInfo} maxColumns={4} />
    </div>
  );
};

export default UserDetailsSection;
