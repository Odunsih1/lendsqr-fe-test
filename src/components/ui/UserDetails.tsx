// src/components/ui/UserDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserHeader from "./UserHeader";
import UserOverview from "./UserOverview";
import UserDetailsSection from "./UserDetailsSection";
import type {
  User,
  InfoItem,
  RawUser,
  UserStatus,
} from "../../types/user.types";
import { UserStorageService } from "../../utils/LocalStorage"; // Ensure correct casing
import styles from "../../styles/useDetail.module.scss";

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

        const data: { users: RawUser[] } = await response.json();

        // Find the specific user
        const foundUser = data.users.find(
          (u: RawUser) => u.id?.toString() === userId
        );

        if (!foundUser) {
          setError("User not found");
          return;
        }

        // Get status updates from localStorage
        const statusUpdates = UserStorageService.getUserStatusUpdates();

        // Format user data
        const formattedUser: User = {
          id: foundUser.id?.toString() || userId!,
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
            (foundUser.id && statusUpdates[foundUser.id.toString()]) ||
            foundUser.status?.toLowerCase() ||
            "unknown",
          avatar: foundUser.avatar || "https://default-avatar.com",
          name:
            foundUser.name ||
            foundUser.personalInformation?.fullName ||
            "Unknown",
          tier: foundUser.tier || 1,
          bankBalance: foundUser.bankBalance || "0",
          bankDetails: foundUser.bankDetails || "N/A",
          personalInformation: foundUser.personalInformation
            ? {
                fullName: foundUser.personalInformation.fullName || "Unknown",
                email: foundUser.personalInformation.email || "N/A",
                bvn: foundUser.personalInformation.bvn || 0,
                gender: foundUser.personalInformation.gender || "N/A",
                maritalStatus:
                  foundUser.personalInformation.maritalStatus || "N/A",
                children: foundUser.personalInformation.children || 0,
                typeOfResidence:
                  foundUser.personalInformation.typeOfResidence || "N/A",
                phoneNumber: foundUser.personalInformation.phoneNumber || "N/A",
              }
            : undefined,
          educationAndEmployment: foundUser.educationAndEmployment
            ? {
                levelOfEducation:
                  foundUser.educationAndEmployment.levelOfEducation || "N/A",
                employmentStatus:
                  foundUser.educationAndEmployment.employmentStatus || "N/A",
                sectorOfEmployment:
                  foundUser.educationAndEmployment.sectorOfEmployment || "N/A",
                durationOfEmployment:
                  foundUser.educationAndEmployment.durationOfEmployment ||
                  "N/A",
                officeEmail:
                  foundUser.educationAndEmployment.officeEmail || "N/A",
                monthlyIncome:
                  foundUser.educationAndEmployment.monthlyIncome || "N/A",
                loanRepayment:
                  foundUser.educationAndEmployment.loanRepayment || "N/A",
              }
            : undefined,
          socials: foundUser.socials
            ? {
                twitter: foundUser.socials.twitter || "N/A",
                facebook: foundUser.socials.facebook || "N/A",
                instagram: foundUser.socials.instagram || "N/A",
              }
            : undefined,
          guarantor: foundUser.guarantor
            ? {
                fullName: foundUser.guarantor.fullName || "N/A",
                phoneNumber: foundUser.guarantor.phoneNumber || "N/A",
                email: foundUser.guarantor.email || "N/A",
                relationship: foundUser.guarantor.relationship || "N/A",
              }
            : undefined,
        };

        setUser(formattedUser);
      } catch (error) {
        console.error("Fetch error:", error);
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
  const handleStatusUpdate = (userId: string, newStatus: UserStatus) => {
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
      value: user.personalInformation?.fullName || user.name,
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

  // Use the full User object for userData
  const userData: User = {
    ...user,
    avatar: user.avatar || "/images/user.png",
    name: user.name || user.personalInformation?.fullName || user.username,
    tier: user.tier || 1,
    bankBalance:
      user.bankBalance ||
      user.educationAndEmployment?.monthlyIncome?.split(" - ")[1] ||
      "₦0.00",
    bankDetails: user.bankDetails || "9912345678/Providus Bank",
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
