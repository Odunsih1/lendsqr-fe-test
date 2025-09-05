import React, { type ReactNode } from "react";
import styles from "../../styles/Card.module.scss";

interface CardProps {
  icon: ReactNode;
  label: string;
  count: string;
}

const Card: React.FC<CardProps> = ({ icon, label, count }) => {
  return (
    <div className={styles.card}>
      <div>{icon}</div>
      <div className={styles.label}>{label}</div>
      <div className={styles.count}>{count}</div>
    </div>
  );
};

export default Card;
