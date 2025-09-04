import Button from "./Button";
import Input from "./Input";
import styles from "../../styles/LoginForm.module.scss";

const LoginForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.intro}>
        <h1 className={styles.title}>Welcome!</h1>
        <p className={styles.subtitle}>Enter details to login.</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input type="email" name="email" placeholder="Email" />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          showPasswordToggle
        />
        <a className={styles.forgotPassword} href="#">
          FORGOT PASSWORD?
        </a>
        <Button type="submit" className={styles.loginButton}>
          LOG IN
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
