import React, { useState, useRef } from "react";
import * as Icons from "../../assets/icons";
import FilterDropdown from "./FilterDropdown";
import ActionDropdown from "./ActionDropdown";
import styles from "../../styles/Users.module.scss";

const Users = () => {
  const [filterDropdown, setFilterDropdown] = useState({
    isOpen: false,
    position: { top: 0, left: 0 },
  });

  const [actionDropdown, setActionDropdown] = useState({
    isOpen: false,
    position: { top: 0, left: 0 },
    userId: "",
  });

  const filterRefs = useRef<(HTMLTableHeaderCellElement | null)[]>([]);
  const actionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleFilterClick = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    const rect = filterRefs.current[index]?.getBoundingClientRect();

    if (rect) {
      setFilterDropdown({
        isOpen: !filterDropdown.isOpen,
        position: {
          top: rect.bottom + window.scrollY + 8,
          left: rect.left + window.scrollX,
        },
      });
    }
  };

  const handleActionClick = (
    event: React.MouseEvent,
    userId: string,
    index: number
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const rect = actionRefs.current[index]?.getBoundingClientRect();

    if (rect) {
      setActionDropdown({
        isOpen: !actionDropdown.isOpen,
        position: {
          top: rect.bottom + window.scrollY + 8,
          left: rect.right + window.scrollX - 180, // Align to right edge
        },
        userId,
      });
    }
  };

  const closeFilterDropdown = () => {
    setFilterDropdown((prev) => ({ ...prev, isOpen: false }));
  };

  const closeActionDropdown = () => {
    setActionDropdown((prev) => ({ ...prev, isOpen: false }));
  };

  const users = [
    {
      id: "1",
      organization: "Lendsqr",
      username: "Adedeji",
      email: "adedeji@lendsqr.com",
      phone: "08078903721",
      dateJoined: "May 15, 2020 10:00 AM",
      status: "inactive",
    },
    {
      id: "2",
      organization: "Lendsqr",
      username: "Deborah",
      email: "deborah@lendsqr.com",
      phone: "08078903722",
      dateJoined: "Apr 30, 2020 10:00 AM",
      status: "active",
    },
    {
      id: "3",
      organization: "Lendsqr",
      username: "Grace",
      email: "grace@lendsqr.com",
      phone: "08078903723",
      dateJoined: "Apr 30, 2020 10:00 AM",
      status: "pending",
    },
    {
      id: "4",
      organization: "Lendsqr",
      username: "Tosin",
      email: "tosin@lendsqr.com",
      phone: "08078903724",
      dateJoined: "Apr 10, 2020 10:00 AM",
      status: "blacklist",
    },
  ];

  return (
    <>
      <div className={styles.table}>
        <table>
          <thead>
            <tr className={styles.head}>
              <th
                ref={(el) => (filterRefs.current[0] = el)}
                onClick={(e) => handleFilterClick(e, 0)}
              >
                ORGANIZATION
                <Icons.Filter />
              </th>
              <th
                ref={(el) => (filterRefs.current[1] = el)}
                onClick={(e) => handleFilterClick(e, 1)}
              >
                USERNAME
                <Icons.Filter />
              </th>
              <th
                ref={(el) => (filterRefs.current[2] = el)}
                onClick={(e) => handleFilterClick(e, 2)}
              >
                EMAIL
                <Icons.Filter />
              </th>
              <th
                ref={(el) => (filterRefs.current[3] = el)}
                onClick={(e) => handleFilterClick(e, 3)}
              >
                PHONE NUMBER
                <Icons.Filter />
              </th>
              <th
                ref={(el) => (filterRefs.current[4] = el)}
                onClick={(e) => handleFilterClick(e, 4)}
              >
                DATE JOINED
                <Icons.Filter />
              </th>
              <th
                ref={(el) => (filterRefs.current[5] = el)}
                onClick={(e) => handleFilterClick(e, 5)}
              >
                STATUS
                <Icons.Filter />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td data-label="Organization">{user.organization}</td>
                <td data-label="Username">{user.username}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Phone Number">{user.phone}</td>
                <td data-label="Date Joined">{user.dateJoined}</td>
                <td data-label="Status">
                  <span className={styles[user.status]}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td>
                  <div
                    ref={(el) => (actionRefs.current[index] = el)}
                    className={styles.actionIcon}
                    onClick={(e) => handleActionClick(e, user.id, index)}
                  >
                    <Icons.IcIcon />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FilterDropdown
        isOpen={filterDropdown.isOpen}
        onClose={closeFilterDropdown}
        position={filterDropdown.position}
      />

      <ActionDropdown
        isOpen={actionDropdown.isOpen}
        onClose={closeActionDropdown}
        position={actionDropdown.position}
        userId={actionDropdown.userId}
      />
      <div className={styles.showingOption}>
        <div>
          <p className={styles.showing}>
            Showing{" "}
            <span className={styles.current}>
              100 <Icons.DownArrowIcon />{" "}
            </span>{" "}
            out of 500
          </p>
        </div>
        <div className={styles.move}>
          <div className={styles.arrow}>
            <Icons.LeftArrowIcon />
          </div>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>...</p>
          <p>15</p>
          <p>16</p>
          <div className={styles.arrow}>
            <Icons.RightArrowIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
