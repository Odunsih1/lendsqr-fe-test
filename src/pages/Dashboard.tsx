import React from "react";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import UsersLayout from "../components/layout/UsersLayout";
import styles from "../styles/Dashboard.module.scss"

const Dashboard = () => {
  return (
    <>
      <Header />
      <section className={styles.layout}>
      <Nav />
      <UsersLayout />
      </section>
    </>
  );
};

export default Dashboard;
