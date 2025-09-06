import type { User } from "../types/user.types";

// Utils for localStorage management
export class UserStorageService {
  private static readonly USER_STATUS_KEY = 'user_status_updates';
  private static readonly USER_DETAILS_KEY = 'selected_user';
  
  static getUserStatusUpdates(): Record<string, string> {
    try {
      const stored = localStorage.getItem(this.USER_STATUS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error reading user status from localStorage:', error);
      return {};
    }
  }
  
  static updateUserStatus(userId: string, status: string): void {
    try {
      const updates = this.getUserStatusUpdates();
      updates[userId] = status;
      localStorage.setItem(this.USER_STATUS_KEY, JSON.stringify(updates));
    } catch (error) {
      console.error('Error saving user status to localStorage:', error);
    }
  }

  static setSelectedUser(user: User): void {
    try {
      localStorage.setItem(this.USER_DETAILS_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving selected user to localStorage:', error);
    }
  }

  static getSelectedUser(): User | null {
    try {
      const stored = localStorage.getItem(this.USER_DETAILS_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error reading selected user from localStorage:', error);
      return null;
    }
  }
}
