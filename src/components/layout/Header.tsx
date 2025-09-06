import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as NotificationIcon } from "../../assets/icons/notification.svg";
import styles from "../../styles/Header.module.scss";

const Header = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    setIsProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    setIsSearchActive(false);
  };

  return (
    <header className={styles.Header}>
      <div className={styles.logoContainer}>
        <img width={144} src="/images/logo.png" alt="Logo" />
      </div>

      <div className={`${styles.searchContainer} ${isSearchActive ? styles.active : ""}`}>
        <Input
          placeholder="Search for anything"
          className={`${styles.searchInput} ${isSearchActive ? styles.active : ""}`}
        />
        <Button
          variant="primary"
          className={styles.searchButton}
          onClick={toggleSearch}
          aria-label={isSearchActive ? "Close search" : "Open search"}
        >
          <SearchIcon width={20} height={20} />
        </Button>
      </div>

      <div className={styles.profileContainer}>
        <a href="#" className={styles.docs}>
          Docs
        </a>
        <button 
          type="button" 
          className={styles.notificationIcon}
          aria-label="Notifications"
        >
          <NotificationIcon />
        </button>
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
              <a href="/" className={styles.menuItem}>
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