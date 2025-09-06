import React from "react";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import styles from "../styles/User-detail.module.scss";
import UserDetails from "../components/ui/UserDetails";

const User = () => {
  return (
    <>
      <Header />
      <section className={styles.layout}>
        <Nav />
        <UserDetails />
      </section>
    </>
  );
};

export default User;
