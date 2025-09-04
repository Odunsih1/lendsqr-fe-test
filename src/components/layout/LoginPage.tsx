import Logo from "../ui/Logo";
import LoginForm from "../ui/LoginForm";
import styles from "../../styles/LoginPage.module.scss";

const LoginPage = () => {
  return (
    <main className={styles.main}>
      <Logo />
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            width={700}
            height={437}
            src="/images/sign-in.png"
            alt="sign-in illustration"
          />
        </div>
        <LoginForm />
      </div>
    </main>
  );
};

export default LoginPage;
