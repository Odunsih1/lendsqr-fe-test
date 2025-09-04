import styles from "../../styles/Logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img
        width={173}
        height={36}
        src="/images/logo.png"
        alt="lendsqr's logo"
      />
    </div>
  );
};

export default Logo;
