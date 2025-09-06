import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import styles from "../../styles/LoginForm.module.scss";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const DEFAULT_CREDENTIALS = {
  email: "admin@lendsqr.com",
  password: "lendsqrTest@2025",
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email: admin@lendsqr.com";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email: admin@lendsqr.com";
    } else if (formData.email !== DEFAULT_CREDENTIALS.email) {
      newErrors.email = "Email: admin@lendsqr.com";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password: lendsqrTest@2025";
    } else if (formData.password !== DEFAULT_CREDENTIALS.password) {
      newErrors.password = "Password: lendsqrTest@2025";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate async login (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 500)); // Mock delay
      navigate("/dashboard");
    } catch (error) {
      setErrors({
        general: "An unexpected error occurred. Please try again." + error,
      });
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.intro}>
        <h1 className={styles.title}>Welcome!</h1>
        <p className={styles.subtitle}>Enter details to login.</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        {errors.general && (
          <p className={styles.error} role="alert">
            {errors.general}
          </p>
        )}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p className={styles.error} id="email-error" role="alert">
            {errors.email}
          </p>
        )}
        <Input
          type="password"
          name="password"
          className={styles.input}
          placeholder="Password"
          showPasswordToggle
          value={formData.password}
          onChange={handleChange}
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && (
          <p className={styles.error} id="password-error" role="alert">
            {errors.password}
          </p>
        )}
        <a className={styles.forgotPassword} href="/forgot-password">
          FORGOT PASSWORD?
        </a>
        <Button
          type="submit"
          className={styles.loginButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "LOG IN"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
