import type { FC, ReactNode } from "react";
import styles from "../../styles/NavButton.module.scss";

interface NavButtonProps {
  icon: ReactNode;
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const NavButton: FC<NavButtonProps> = ({
  icon,
  children,
  isActive = false,
  onClick,
  className = "",
}) => {
  return (
    <button
      type="button"
      className={`${styles.navButton} ${
        isActive ? styles.active : ""
      } ${className}`}
      onClick={onClick}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.text}>{children}</span>
    </button>
  );
};

export default NavButton;
