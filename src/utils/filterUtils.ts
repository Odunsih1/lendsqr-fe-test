import type { FilterState, User } from "../types/user.types";

// Filter utilities
export class FilterUtils {
  static applyFilters(users: User[], filters: FilterState): User[] {
    return users.filter((user) => {
      // Organization filter
      if (filters.organization && 
          user.organization.toLowerCase() !== filters.organization.toLowerCase()) {
        return false;
      }
      
      // Username filter
      if (filters.username && 
          !user.username.toLowerCase().includes(filters.username.toLowerCase())) {
        return false;
      }
      
      // Email filter
      if (filters.email && 
          !user.email.toLowerCase().includes(filters.email.toLowerCase())) {
        return false;
      }
      
      // Phone number filter
      if (filters.phoneNumber && 
          !user.phoneNumber.includes(filters.phoneNumber)) {
        return false;
      }
      
      // Status filter
      if (filters.status && 
          user.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false;
      }
      
      // Date filter
      if (filters.date) {
        try {
          const filterDate = new Date(filters.date);
          const userDate = new Date(user.dateJoined);
          
          // Compare dates (same day)
          if (filterDate.toDateString() !== userDate.toDateString()) {
            return false;
          }
        } catch (error) {
          // If date parsing fails, skip this filter
          console.warn('Invalid date format in filter');
        }
      }
      
      return true;
    });
  }
  
  static isFilterEmpty(filters: FilterState): boolean {
    return Object.values(filters).every(value => !value.trim());
  }
}