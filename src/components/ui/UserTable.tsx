import React, { useRef } from "react";
import * as Icons from "../../assets/icons";
import styles from "../../styles/Users.module.scss";

interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
}

interface UserTableProps {
  users: User[];
  onFilterClick: (event: React.MouseEvent, index: number) => void;
  onActionClick: (
    event: React.MouseEvent,
    userId: string,
    index: number
  ) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onFilterClick,
  onActionClick,
}) => {
  const filterRefs = useRef<(HTMLTableHeaderCellElement | null)[]>([]);
  const actionRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr className={styles.head}>
            {[
              "ORGANIZATION",
              "USERNAME",
              "EMAIL",
              "PHONE NUMBER",
              "DATE JOINED",
              "STATUS",
              "",
            ].map((header, index) => (
              <th
                key={header}
                ref={(el) => (filterRefs.current[index] = el)}
                onClick={(e) => index < 6 && onFilterClick(e, index)} // Prevent filter on last column
              >
                {header}
                {index < 6 && <Icons.Filter />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.body}>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td data-label="Organization">{user.organization}</td>
              <td data-label="Username">{user.username}</td>
              <td data-label="Email">{user.email}</td>
              <td data-label="Phone Number">{user.phoneNumber}</td>
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
                  onClick={(e) => onActionClick(e, user.id, index)}
                >
                  <Icons.IcIcon />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
