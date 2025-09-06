export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: string;
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

