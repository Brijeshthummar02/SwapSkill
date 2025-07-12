
export interface User {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
}

export interface AdminUser extends User {
  isAdmin: boolean;
  adminPermissions: AdminPermission[];
  lastAdminActivity?: string;
}

export interface AdminPermission {
  id: string;
  name: string;
  description: string;
}

export interface SwapReport {
  id: string;
  swapId: string;
  reporterId: string;
  reportedUserId: string;
  reason: string;
  description: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface UserReport {
  id: string;
  reporterId: string;
  reportedUserId: string;
  reason: string;
  description: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface AdminAnnouncement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'error';
  targetAudience: 'all' | 'admins' | 'users';
  createdBy: string;
  createdAt: string;
  isActive: boolean;
}

export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalSwaps: number;
  completedSwaps: number;
  pendingReports: number;
  newUsersToday: number;
  swapsToday: number;
}
