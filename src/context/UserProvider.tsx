import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import type {
  User,
  UserStatus,
  FilterState,
  RawUser,
} from "../types/user.types";
import { UserContext } from "./useUserContext";
import { FilterUtils } from "../utils/filterUtils";
import { UserStorageService } from "../utils/LocalStorage";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    organization: "",
    username: "",
    email: "",
    date: "",
    phoneNumber: "",
    status: "",
  });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch("/data/user.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const statusUpdates = UserStorageService.getUserStatusUpdates();

        const formattedUsers: User[] = data.users.map(
          (user: RawUser, index: number) => ({
            id: user.id?.toString() || `${index + 1}`,
            organization: user.organization || "Unknown",
            username:
              user.personalInformation?.fullName?.split(" ")[0] ||
              user.username ||
              "Unknown",
            email: user.email || "N/A",
            phoneNumber: user.phoneNumber || "N/A",
            dateJoined: user.dateJoined
              ? new Date(user.dateJoined).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "N/A",
            status:
              (user.id && statusUpdates[user.id.toString()]) ||
              user.status?.toLowerCase() ||
              "unknown",
            avatar: user.avatar || "https://default-avatar.com",
            name: user.name || user.personalInformation?.fullName || "Unknown",
            tier: user.tier || 1,
            bankBalance: user.bankBalance || "0",
            bankDetails: user.bankDetails || "N/A",
            personalInformation: user.personalInformation
              ? {
                  fullName: user.personalInformation.fullName || "Unknown",
                  email: user.personalInformation.email || "N/A",
                  bvn: user.personalInformation.bvn || 0,
                  gender: user.personalInformation.gender || "N/A",
                  maritalStatus:
                    user.personalInformation.maritalStatus || "N/A",
                  children: user.personalInformation.children || 0,
                  typeOfResidence:
                    user.personalInformation.typeOfResidence || "N/A",
                  phoneNumber: user.personalInformation.phoneNumber || "N/A",
                }
              : undefined,
            educationAndEmployment: user.educationAndEmployment
              ? {
                  levelOfEducation:
                    user.educationAndEmployment.levelOfEducation || "N/A",
                  employmentStatus:
                    user.educationAndEmployment.employmentStatus || "N/A",
                  sectorOfEmployment:
                    user.educationAndEmployment.sectorOfEmployment || "N/A",
                  durationOfEmployment:
                    user.educationAndEmployment.durationOfEmployment || "N/A",
                  officeEmail: user.educationAndEmployment.officeEmail || "N/A",
                  monthlyIncome:
                    user.educationAndEmployment.monthlyIncome || "N/A",
                  loanRepayment:
                    user.educationAndEmployment.loanRepayment || "N/A",
                }
              : undefined,
            socials: user.socials
              ? {
                  twitter: user.socials.twitter || "N/A",
                  facebook: user.socials.facebook || "N/A",
                  instagram: user.socials.instagram || "N/A",
                }
              : undefined,
            guarantor: user.guarantor
              ? {
                  fullName: user.guarantor.fullName || "N/A",
                  phoneNumber: user.guarantor.phoneNumber || "N/A",
                  email: user.guarantor.email || "N/A",
                  relationship: user.guarantor.relationship || "N/A",
                }
              : undefined,
          })
        );

        setUsers(formattedUsers);
        setFilteredUsers(formattedUsers);
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };

    loadUsers();
  }, []);

  const updateUserStatus = (userId: string, status: UserStatus): void => {
    UserStorageService.updateUserStatus(userId, status);
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, status } : user
    );
    setUsers(updatedUsers);
    const filtered = FilterUtils.applyFilters(updatedUsers, appliedFilters);
    setFilteredUsers(filtered);
    if (selectedUser?.id === userId) {
      setSelectedUser({ ...selectedUser, status });
    }
  };

  const applyFilters = (filters: FilterState): void => {
    setAppliedFilters(filters);
    const filtered = FilterUtils.applyFilters(users, filters);
    setFilteredUsers(filtered);
  };

  const clearFilters = (): void => {
    const emptyFilters: FilterState = {
      organization: "",
      username: "",
      email: "",
      date: "",
      phoneNumber: "",
      status: "",
    };
    setAppliedFilters(emptyFilters);
    setFilteredUsers(users);
  };

  const selectUser = (user: User): void => {
    setSelectedUser(user);
  };

  const contextValue = {
    users,
    filteredUsers,
    selectedUser,
    updateUserStatus,
    applyFilters,
    clearFilters,
    selectUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
