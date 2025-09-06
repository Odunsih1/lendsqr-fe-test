import React from "react";
import type { InfoGridProps, InfoItem } from "../../types/user.types";
import styles from "../../styles/useDetail.module.scss";

const InfoGrid: React.FC<InfoGridProps> = ({ title, data, maxColumns = 4 }) => {
  const gridClass: string =
    maxColumns === 5 ? styles.personalInfoGrid : styles.educationInfoGrid;

  return (
    <div className={styles.infoContainer}>
      <h2>{title}</h2>
      <div className={`${styles.personalInfo} ${gridClass}`}>
        {data.map((item: InfoItem, index: number) => (
          <div key={`${item.label}-${index}`} className={styles.info}>
            <h5>{item.label}</h5>
            <h4>{item.value}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoGrid;
