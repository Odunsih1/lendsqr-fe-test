import React,  {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type {
  User,
  UserStatus,
  FilterState,
  UserContextType,
} from "../types/user.types";
import { FilterUtils } from "../utils/filterUtils";
import { UserStorageService } from "../utils/LocalStorage";

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

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

  // Load users and apply status updates from localStorage
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch("/data/user.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Get status updates from localStorage
        const statusUpdates = UserStorageService.getUserStatusUpdates();

        const formattedUsers: User[] = data.users.map(
          (user: any, index: number) => ({
            id: user.id || `${index + 1}`,
            organization: user.organization || "Unknown",
            username:
              user.personalInformation?.fullName?.split(" ")[0] || "Unknown",
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
              statusUpdates[user.id] || user.status?.toLowerCase() || "unknown",
            personalInformation: user.personalInformation,
            educationAndEmployment: user.educationAndEmployment,
            socials: user.socials,
            guarantor: user.guarantor,
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

  // Update user status
  const updateUserStatus = (userId: string, status: UserStatus): void => {
    // Update in localStorage
    UserStorageService.updateUserStatus(userId, status);

    // Update in state
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, status } : user
    );

    setUsers(updatedUsers);

    // Apply current filters to updated users
    const filtered = FilterUtils.applyFilters(updatedUsers, appliedFilters);
    setFilteredUsers(filtered);

    // Update selected user if it's the one being updated
    if (selectedUser?.id === userId) {
      setSelectedUser({ ...selectedUser, status });
    }
  };

  // Apply filters
  const applyFilters = (filters: FilterState): void => {
    setAppliedFilters(filters);
    const filtered = FilterUtils.applyFilters(users, filters);
    setFilteredUsers(filtered);
  };

  // Clear filters
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

  // Select user for details view
  const selectUser = (user: User): void => {
    setSelectedUser(user);
  };

  const contextValue: UserContextType = {
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
