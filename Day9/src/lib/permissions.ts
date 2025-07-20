import { AbilityBuilder, createMongoAbility, MongoAbility } from '@casl/ability';

export type Actions = 
  | 'manage' 
  | 'create' 
  | 'read' 
  | 'update' 
  | 'delete'
  | 'view'
  | 'edit'
  | 'submit'
  | 'grade'
  | 'approve'
  | 'reject';

export type Subjects = 
  | 'all'
  | 'User'
  | 'Student' 
  | 'Teacher'
  | 'Admin'
  | 'Assignment'
  | 'Attendance'
  | 'Grade'
  | 'Timetable'
  | 'LeaveApplication'
  | 'Notification'
  | 'Report'
  | 'Settings'
  | 'Dashboard';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

export const defineAbilitiesFor = (role: string) => {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  switch (role) {
    case 'admin':
      // Admin has full access
      can('manage', 'all');
      
      // Specific permissions for different admin levels
      can(['create', 'read', 'update', 'delete'], 'User');
      can(['create', 'read', 'update', 'delete'], 'Student');
      can(['create', 'read', 'update', 'delete'], 'Teacher');
      can(['create', 'read', 'update', 'delete'], 'Assignment');
      can(['create', 'read', 'update'], 'Attendance');
      can(['read', 'update'], 'Grade');
      can(['create', 'read', 'update', 'delete'], 'Timetable');
      can(['read', 'approve', 'reject'], 'LeaveApplication');
      can(['create', 'read', 'update', 'delete'], 'Notification');
      can(['read'], 'Report');
      can(['read', 'update'], 'Settings');
      can(['view'], 'Dashboard');
      break;

    case 'teacher':
      // Teacher permissions - simplified without field conditions
      can(['read'], 'Student'); // Can view student information
      can(['create', 'read', 'update', 'delete'], 'Assignment');
      can(['create', 'read', 'update'], 'Attendance');
      can(['read', 'update'], 'Grade');
      can(['read'], 'Timetable');
      can(['create', 'read'], 'LeaveApplication');
      can(['read'], 'Notification');
      can(['read'], 'Report');
      can(['view'], 'Dashboard');
      
      // Can read own profile
      can(['read', 'update'], 'Teacher');
      
      // Cannot manage users or system settings
      cannot(['create', 'delete'], 'User');
      cannot(['manage'], 'Settings');
      break;

    case 'student':
      // Student permissions - most restrictive, simplified
      can(['read'], 'Assignment'); // Can view assignments
      can(['submit'], 'Assignment'); // Can submit assignments
      can(['read'], 'Attendance'); // Can view own attendance
      can(['read'], 'Grade'); // Can view own grades
      can(['read'], 'Timetable'); // Can view timetable
      can(['create', 'read'], 'LeaveApplication');
      can(['read'], 'Notification');
      can(['view'], 'Dashboard');
      
      // Can read and update own profile
      can(['read', 'update'], 'Student');
      
      // Cannot manage other entities
      cannot(['create', 'update', 'delete'], 'User');
      cannot(['manage'], 'Teacher');
      cannot(['create', 'update', 'delete'], 'Assignment');
      cannot(['create', 'update'], 'Attendance');
      cannot(['update', 'delete'], 'Grade');
      cannot(['create', 'update', 'delete'], 'Timetable');
      cannot(['manage'], 'Settings');
      cannot(['manage'], 'Report');
      break;

    default:
      // Guest/unauthenticated users - no permissions
      cannot('manage', 'all');
      break;
  }

  return build();
};

// Helper functions for common permission checks
export const canUserAccess = (ability: AppAbility, action: Actions, subject: Subjects, field?: any) => {
  return ability.can(action, subject, field);
};

export const canUserManage = (ability: AppAbility, subject: Subjects) => {
  return ability.can('manage', subject);
};

export const getUserPermissions = (role: string) => {
  const ability = defineAbilitiesFor(role);
  return ability.rules;
};

// Permission constants for easy reference
export const PERMISSIONS = {
  // User Management
  MANAGE_USERS: { action: 'manage' as const, subject: 'User' as const },
  CREATE_USER: { action: 'create' as const, subject: 'User' as const },
  VIEW_USERS: { action: 'read' as const, subject: 'User' as const },
  EDIT_USER: { action: 'update' as const, subject: 'User' as const },
  DELETE_USER: { action: 'delete' as const, subject: 'User' as const },

  // Assignment Management
  MANAGE_ASSIGNMENTS: { action: 'manage' as const, subject: 'Assignment' as const },
  CREATE_ASSIGNMENT: { action: 'create' as const, subject: 'Assignment' as const },
  VIEW_ASSIGNMENT: { action: 'read' as const, subject: 'Assignment' as const },
  EDIT_ASSIGNMENT: { action: 'update' as const, subject: 'Assignment' as const },
  DELETE_ASSIGNMENT: { action: 'delete' as const, subject: 'Assignment' as const },
  SUBMIT_ASSIGNMENT: { action: 'submit' as const, subject: 'Assignment' as const },
  GRADE_ASSIGNMENT: { action: 'grade' as const, subject: 'Assignment' as const },

  // Attendance Management
  MANAGE_ATTENDANCE: { action: 'manage' as const, subject: 'Attendance' as const },
  CREATE_ATTENDANCE: { action: 'create' as const, subject: 'Attendance' as const },
  VIEW_ATTENDANCE: { action: 'read' as const, subject: 'Attendance' as const },
  EDIT_ATTENDANCE: { action: 'update' as const, subject: 'Attendance' as const },

  // Grade Management
  VIEW_GRADES: { action: 'read' as const, subject: 'Grade' as const },
  EDIT_GRADES: { action: 'update' as const, subject: 'Grade' as const },

  // Leave Applications
  CREATE_LEAVE: { action: 'create' as const, subject: 'LeaveApplication' as const },
  VIEW_LEAVE: { action: 'read' as const, subject: 'LeaveApplication' as const },
  APPROVE_LEAVE: { action: 'approve' as const, subject: 'LeaveApplication' as const },
  REJECT_LEAVE: { action: 'reject' as const, subject: 'LeaveApplication' as const },

  // Dashboard
  VIEW_DASHBOARD: { action: 'view' as const, subject: 'Dashboard' as const },

  // Reports
  VIEW_REPORTS: { action: 'read' as const, subject: 'Report' as const },

  // Settings
  MANAGE_SETTINGS: { action: 'manage' as const, subject: 'Settings' as const }
} as const;
