import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button"; // Import the Button component
import styles from "../../styles/Header.module.scss";

const Header = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    setIsProfileMenuOpen(false); // Close profile menu when search is toggled
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsSearchActive(false); // Close search when profile menu is toggled
  };

  return (
    <header className={styles.Header}>
      <div className={styles.logoContainer}>
        <img width={144} src="/images/logo.png" alt="Logo" />
      </div>

      <div
        className={`${styles.searchContainer} ${
          isSearchActive ? styles.active : ""
        }`}
      >
        <Input
          placeholder="Search for anything"
          className={`${styles.searchInput} ${
            isSearchActive ? styles.active : ""
          }`}
        />
        <Button
          variant="primary"
          className={styles.searchButton}
          onClick={toggleSearch}
          aria-label={isSearchActive ? "Close search" : "Open search"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.3541 0.000553316C3.94043 0.0214743 2.59056 0.59363 1.5911 1.59554C0.572324 2.6165 0 4.00108 0 5.44478C0 6.88848 0.572324 8.27307 1.5911 9.29402C2.5152 10.2183 3.74056 10.7782 5.04297 10.8714C6.34537 10.9645 7.6377 10.5847 8.68348 9.80138L12.874 14L13.9717 12.9002L9.77963 8.70008C10.5612 7.65258 10.9403 6.35818 10.8476 5.05362C10.7549 3.74905 10.1966 2.52153 9.27477 1.59554C8.76094 1.08047 8.1492 0.673917 7.47576 0.39995C6.80232 0.125984 6.08086 -0.00982865 5.3541 0.000553316ZM5.48903 1.55605C6.49887 1.57093 7.46314 1.97962 8.1771 2.69533C8.9048 3.42458 9.3136 4.41357 9.3136 5.44478C9.3136 6.476 8.9048 7.46498 8.1771 8.19424C7.44925 8.92334 6.46216 9.33293 5.43293 9.33293C4.4037 9.33293 3.41662 8.92334 2.68877 8.19424C1.96107 7.46498 1.55227 6.476 1.55227 5.44478C1.55227 4.41357 1.96107 3.42458 2.68877 2.69533C3.05576 2.32744 3.49268 2.03706 3.97367 1.84137C4.45466 1.64568 4.96995 1.54866 5.48903 1.55605Z"
              fill="currentColor"
            />
          </svg>
        </Button>
        {isSearchActive && (
          <Button
            variant="secondary"
            className={styles.cancelSearch}
            onClick={toggleSearch}
            aria-label="Cancel search"
          >
            ✕
          </Button>
        )}
      </div>

      <div className={styles.profileContainer}>
        <a href="#" className={styles.docs}>
          Docs
        </a>
        <Button
          variant="secondary"
          className={styles.notificationIcon}
          aria-label="Notifications"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.9985 1.53313C13.8909 1.53328 14.6959 2.06499 15.0483 2.8847C15.3569 3.60368 15.2632 4.4233 14.8198 5.05071C16.1884 5.45586 17.3981 6.2817 18.2749 7.41497C19.215 8.63014 19.717 10.1268 19.6997 11.663V13.5976L19.7124 14.1318C19.8389 16.7974 20.9561 19.3268 22.8579 21.2177C23.0323 21.3906 23.0857 21.6534 22.9917 21.8808L22.9907 21.8818C22.896 22.1069 22.6763 22.2548 22.4292 22.2538V22.2548H15.9751C15.68 23.6544 14.4456 24.6697 13.0005 24.6699C11.5552 24.6699 10.3212 23.6545 10.0259 22.2548H3.5708V22.2538C3.32378 22.2547 3.104 22.1069 3.00928 21.8818L3.0083 21.8808C2.91432 21.6534 2.96767 21.3906 3.14209 21.2177C5.17061 19.201 6.3072 16.4577 6.30029 13.5976V11.4921C6.30037 9.97954 6.81235 8.51204 7.75342 7.32806C8.62786 6.22583 9.82512 5.42899 11.1733 5.04681C10.7325 4.41996 10.64 3.60211 10.9478 2.8847C11.3002 2.06487 12.106 1.53313 12.9985 1.53313ZM11.2729 22.2548C11.5268 22.9795 12.2132 23.4782 12.9995 23.4784C13.786 23.4784 14.4731 22.9796 14.7271 22.2548H11.2729ZM13.2642 6.00384C11.7637 5.93197 10.2995 6.47748 9.2124 7.51458C8.12478 8.55105 7.51025 9.98892 7.51221 11.4921V13.5966L7.50244 14.1298C7.39775 16.6483 6.49245 19.068 4.92236 21.0419H21.0767C19.3963 18.9291 18.4791 16.305 18.4878 13.5966V11.6601C18.5123 10.2259 17.9837 8.83802 17.0103 7.78411C16.0378 6.73124 14.6953 6.09315 13.2642 6.00481V6.00384ZM13.0005 2.75481C12.4377 2.75481 11.9811 3.21058 11.981 3.77337C11.981 4.18514 12.2296 4.55686 12.6108 4.71478C12.9436 4.85205 13.3203 4.80317 13.605 4.59368L13.7212 4.49407C14.0121 4.20191 14.0989 3.76395 13.9419 3.38372C13.784 3.00272 13.4121 2.75497 13.0005 2.75481Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.4"
            />
          </svg>
        </Button>
        <div className={styles.profileWrapper}>
          <button
            type="button"
            className={styles.profileButton}
            onClick={toggleProfileMenu}
            aria-label="Toggle profile menu"
            
          >
            <img
              src="/images/profile.png"
              alt="User avatar"
              className={styles.profileImage}
            />
            <p className={styles.profileName}>
              Adedeji{" "}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.39229 12.0516C9.72823 12.425 10.2751 12.4219 10.6079 12.0516L13.4829 8.857C13.8188 8.48434 13.6852 8.182 13.1845 8.182H6.81567C6.31489 8.182 6.18363 8.48746 6.51723 8.857L9.39229 12.0516Z"
                  fill="#213F7D"
                />
              </svg>
            </p>
          </button>
          {isProfileMenuOpen && (
            <div className={styles.profileMenu}>
              <a href="/profile" className={styles.menuItem}>
                Profile
              </a>
              <a href="/settings" className={styles.menuItem}>
                Settings
              </a>
              <a href="/logout" className={styles.menuItem}>
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;