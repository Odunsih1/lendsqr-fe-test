import React from "react";
import * as Icons from "../../assets/icons";
import type { UserOverviewProps } from "../../types/user.types";
import styles from "../../styles/useDetail.module.scss";

const UserOverview: React.FC<UserOverviewProps> = ({
  userData,
  tabOptions,
}) => {
  const renderStars = (tier: number): JSX.Element[] => {
    const stars: JSX.Element[] = [];
    for (let i = 1; i <= 3; i++) {
      stars.push(
        i <= tier ? <Icons.StarIcon key={i} /> : <Icons.EmptyStarIcon key={i} />
      );
    }
    return stars;
  };

  const handleTabClick = (tabIndex: number, tabName: string): void => {
    // Handle tab navigation
    console.log(`Switching to tab: ${tabName} at index ${tabIndex}`);
  };

  return (
    <div className={styles.overview}>
      <div className={styles.profileDetails}>
        <div className={styles.profile}>
          <img src={userData.avatar} alt={`${userData.name} profile`} />
          <div>
            <h3>{userData.name}</h3>
            <p>{userData.id}</p>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.tier}>
          <h5>User's Tier</h5>
          <p>{renderStars(userData.tier)}</p>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.bank}>
          <h4>{userData.bankBalance}</h4>
          <p>{userData.bankDetails}</p>
        </div>
      </div>
      <div className={styles.tab}>
        <ul>
          {tabOptions.map((tab: string, index: number) => (
            <li key={index} onClick={() => handleTabClick(index, tab)}>
              {tab}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserOverview;
