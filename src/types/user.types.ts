export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
  avatar: string;
  name: string;
  tier: number;
  bankBalance: string | number; 
  bankDetails: string; 
  personalInformation?: {
    fullName: string;
    email: string;
    bvn: number;
    gender: string;
    maritalStatus: string;
    children: number;
    typeOfResidence: string;
    phoneNumber: string;
  };
  educationAndEmployment?: {
    levelOfEducation: string;
    employmentStatus: string;
    sectorOfEmployment: string;
    durationOfEmployment: string;
    officeEmail: string;
    monthlyIncome: string;
    loanRepayment: string;
  };
  socials?: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor?: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
}

export interface RawUser {
 id?: string;
 username?: string;
 organization?: string;
 avatar?: string;
 name?: string;
 tier?: number;
 bankBalance?: string | number;
 bankDetails?: string;
 personalInformation?: {
 fullName?: string;
 email?: string;
 bvn?: number;
 gender?: string;
 maritalStatus?: string;
 children?: number;
 typeOfResidence?: string;
 phoneNumber?: string;
 };
 email?: string;
 phoneNumber?: string;
 dateJoined?: string;
 status?: string;
 educationAndEmployment?: {
 levelOfEducation?: string;
 employmentStatus?: string;
 sectorOfEmployment?: string;
 durationOfEmployment?: string;
 officeEmail?: string;
 monthlyIncome?: string;
 loanRepayment?: string;
 };
 socials?: {
 twitter?: string;
 facebook?: string;
 instagram?: string;
 };
 guarantor?: {
 fullName?: string;
 phoneNumber?: string;
 email?: string;
 relationship?: string;
 };
}

export interface FilterState {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

export interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
  onFilter: (filters: FilterState) => void;
  users: User[];
}

export interface ActionDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
  userId: string;
  onStatusChange: (userId: string, status: string) => void;
}


export interface InfoItem {
  label: string;
  value: string | number; 
}

export interface InfoGridProps {
  title: string;
  data: InfoItem[];
  maxColumns?: number;
}

export interface UserDetailsSectionProps {
  personalInfo: InfoItem[];
  educationInfo: InfoItem[];
  socialsInfo: InfoItem[];
  guarantorInfo: InfoItem[];
}          


export interface UserOverviewProps {
  userData: User;
  tabOptions: string[];
}

export type UserStatus = "active" | "inactive" | "pending" | "blacklisted" | string;

export interface UserContextType {
  users: User[];
  filteredUsers: User[];
  selectedUser: User | null;
  updateUserStatus: (userId: string, status: UserStatus) => void;
  applyFilters: (filters: FilterState) => void;
  clearFilters: () => void;
  selectUser: (user: User) => void;
}