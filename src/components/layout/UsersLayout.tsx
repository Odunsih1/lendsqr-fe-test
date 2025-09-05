import React from "react";
import * as Icons from "../../assets/icons";
import Card from "../ui/Card";
import styles from "../../styles/UsersLayout.module.scss";
import Users from "../ui/Users";

const UsersLayout = () => {
  return (
    <main className={styles.main}>
      <div className={styles.submain}>
        <h1 className={styles.h1}>Users</h1>
        <section className={styles.section1}>
          <Card icon={<Icons.Users />} label="USERS" count="2,453" />
          <Card
            icon={<Icons.ActiveUsers />}
            label="ACTIVE USERS"
            count="2,453"
          />
          <Card
            icon={<Icons.UsersLoan />}
            label="USERS WITH LOANS"
            count="12,453"
          />
          <Card
            icon={<Icons.UsersSaving />}
            label="USERS WITH SAVING"
            count="102,453"
          />
        </section>
        <section>
          <Users />
        </section>
      </div>
    </main>
  );
};

export default UsersLayout;
