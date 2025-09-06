import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserOverview from "./UserOverview";
import UserDetailsSection from "./UserDetailsSection";
import type { User, InfoItem } from "../../types/user.types";
import { UserStorageService } from "../../utils/LocalStorage";
import styles from "../../styles/useDetail.module.scss";

interface UserDetailsData {
  name: string;
  id: string;
  avatar: string;
  tier: number;
  bankBalance: string;
  bankDetails: string;
  status: string;
}

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all users data
        const response = await fetch("/data/user.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Find the specific user
        const foundUser = data.users.find(
          (u: any) => u.id.toString() === userId
        );

        if (!foundUser) {
          setError("User not found");
          return;
        }

        // Get status updates from localStorage
        const statusUpdates = UserStorageService.getUserStatusUpdates();

        // Format user data
        const formattedUser: User = {
          id: foundUser.id.toString(),
          organization: foundUser.organization || "Unknown",
          username:
            foundUser.personalInformation?.fullName?.split(" ")[0] ||
            foundUser.username ||
            "Unknown",
          email: foundUser.email || "N/A",
          phoneNumber: foundUser.phoneNumber || "N/A",
          dateJoined: foundUser.dateJoined
            ? new Date(foundUser.dateJoined).toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "N/A",
          status:
            statusUpdates[foundUser.id.toString()] ||
            foundUser.status?.toLowerCase() ||
            "unknown",
          personalInformation: foundUser.personalInformation,
          educationAndEmployment: foundUser.educationAndEmployment,
          socials: foundUser.socials,
          guarantor: foundUser.guarantor,
        };

        setUser(formattedUser);
      } catch (error: any) {
        console.error("Fetch error:", error.message);
        setError("Failed to load user details");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  // Handle status updates
  const handleStatusUpdate = (userId: string, newStatus: string) => {
    if (user) {
      const updatedUser = { ...user, status: newStatus };
      setUser(updatedUser);
      UserStorageService.updateUserStatus(userId, newStatus);
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Loading user details...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={styles.error}>
        <h3>Error</h3>
        <p>{error || "User not found"}</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  const tabOptions: string[] = [
    "General Details",
    "Documents",
    "Bank Details",
    "Loans",
    "Savings",
    "App and System",
  ];

  // Map user data to InfoItem arrays
  const personalInfo: InfoItem[] = [
    {
      label: "FULL NAME",
      value: user.personalInformation?.fullName || user.username,
    },
    {
      label: "PHONE NUMBER",
      value: user.personalInformation?.phoneNumber || user.phoneNumber,
    },
    {
      label: "EMAIL ADDRESS",
      value: user.personalInformation?.email || user.email,
    },
    { label: "BVN", value: user.personalInformation?.bvn?.toString() || "N/A" },
    { label: "GENDER", value: user.personalInformation?.gender || "N/A" },
    {
      label: "MARITAL STATUS",
      value: user.personalInformation?.maritalStatus || "N/A",
    },
    {
      label: "CHILDREN",
      value: user.personalInformation?.children?.toString() || "N/A",
    },
    {
      label: "TYPE OF RESIDENCE",
      value: user.personalInformation?.typeOfResidence || "N/A",
    },
  ];

  const educationInfo: InfoItem[] = [
    {
      label: "LEVEL OF EDUCATION",
      value: user.educationAndEmployment?.levelOfEducation || "N/A",
    },
    {
      label: "EMPLOYMENT STATUS",
      value: user.educationAndEmployment?.employmentStatus || "N/A",
    },
    {
      label: "SECTOR OF EMPLOYMENT",
      value: user.educationAndEmployment?.sectorOfEmployment || "N/A",
    },
    {
      label: "DURATION OF EMPLOYMENT",
      value: user.educationAndEmployment?.durationOfEmployment || "N/A",
    },
    {
      label: "OFFICE EMAIL",
      value: user.educationAndEmployment?.officeEmail || user.email,
    },
    {
      label: "MONTHLY INCOME",
      value: user.educationAndEmployment?.monthlyIncome || "N/A",
    },
    {
      label: "LOAN REPAYMENT",
      value: user.educationAndEmployment?.loanRepayment || "N/A",
    },
  ];

  const socialsInfo: InfoItem[] = [
    { label: "TWITTER", value: user.socials?.twitter || "N/A" },
    { label: "FACEBOOK", value: user.socials?.facebook || "N/A" },
    { label: "INSTAGRAM", value: user.socials?.instagram || "N/A" },
  ];

  const guarantorInfo: InfoItem[] = [
    { label: "FULL NAME", value: user.guarantor?.fullName || "N/A" },
    { label: "PHONE NUMBER", value: user.guarantor?.phoneNumber || "N/A" },
    { label: "EMAIL ADDRESS", value: user.guarantor?.email || "N/A" },
    { label: "RELATIONSHIP", value: user.guarantor?.relationship || "N/A" },
  ];

  // Create user data for header and overview
  const userData: UserDetailsData = {
    name: user.personalInformation?.fullName || user.username,
    id: user.id,
    avatar: "/images/user.png",
    tier: 1,
    bankBalance:
      user.educationAndEmployment?.monthlyIncome?.split(" - ")[1] || "₦0.00",
    bankDetails: "9912345678/Providus Bank",
    status: user.status,
  };

  return (
    <section className={styles.section}>
      <UserHeader userData={userData} onStatusUpdate={handleStatusUpdate} />

      <UserOverview userData={userData} tabOptions={tabOptions} />

      <UserDetailsSection
        personalInfo={personalInfo}
        educationInfo={educationInfo}
        socialsInfo={socialsInfo}
        guarantorInfo={guarantorInfo}
      />
    </section>
  );
};

export default UserDetails;
