import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import styles from "../../styles/LoginInput.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  showPasswordToggle?: boolean;
  className: string;
}
const LoginInput = ({
  label,
  showPasswordToggle = false,
  type = "text",
  className = "",
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputContainer}>
        <input
          {...props}
          type={showPassword ? "text" : type}
          className={`${styles.input} ${className}`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className={styles.showPassword}
            onClick={togglePassword}
          >
            {showPassword ? "HIDE" : "SHOW"}
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginInput;
