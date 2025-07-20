import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { defineAbilitiesFor, Actions, Subjects, canUserAccess } from '../lib/permissions';

export function usePermissions() {
  const { user } = useAuth();
  
  const ability = useMemo(() => {
    return defineAbilitiesFor(user?.role || 'guest');
  }, [user?.role]);

  const can = (action: Actions, subject: Subjects, field?: any) => {
    return canUserAccess(ability, action, subject, field);
  };

  const cannot = (action: Actions, subject: Subjects, field?: any) => {
    return !can(action, subject, field);
  };

  return {
    ability,
    can,
    cannot,
    // Convenience methods for common checks
    canManageUsers: () => can('manage', 'User'),
    canCreateAssignments: () => can('create', 'Assignment'),
    canGradeAssignments: () => can('grade', 'Assignment'),
    canTakeAttendance: () => can('create', 'Attendance'),
    canViewReports: () => can('read', 'Report'),
    canManageSettings: () => can('manage', 'Settings'),
    canApproveLeave: () => can('approve', 'LeaveApplication'),
    canViewDashboard: () => can('view', 'Dashboard'),
  };
}

// Hook for role-specific data
export function useRoleData() {
  const { user } = useAuth();
  const { can } = usePermissions();

  const getMenuItems = () => {
    const baseItems = [
      { 
        icon: 'Home', 
        label: 'Dashboard', 
        path: `/${user?.role}`,
        permission: { action: 'view' as const, subject: 'Dashboard' as const }
      }
    ];

    if (user?.role === 'admin') {
      return [
        ...baseItems,
        { 
          icon: 'Users', 
          label: 'Users', 
          path: '/admin/users',
          permission: { action: 'read' as const, subject: 'User' as const }
        },
        { 
          icon: 'GraduationCap', 
          label: 'Courses', 
          path: '/admin/courses',
          permission: { action: 'read' as const, subject: 'Assignment' as const }
        },
        { 
          icon: 'Calendar', 
          label: 'Schedules', 
          path: '/admin/schedules',
          permission: { action: 'read' as const, subject: 'Timetable' as const }
        },
        { 
          icon: 'BarChart3', 
          label: 'Reports', 
          path: '/admin/reports',
          permission: { action: 'read' as const, subject: 'Report' as const }
        },
        { 
          icon: 'Settings', 
          label: 'Settings', 
          path: '/admin/settings',
          permission: { action: 'manage' as const, subject: 'Settings' as const }
        }
      ];
    }

    if (user?.role === 'teacher') {
      return [
        ...baseItems,
        { 
          icon: 'Users', 
          label: 'Classes', 
          path: '/teacher/classes',
          permission: { action: 'read' as const, subject: 'Student' as const }
        },
        { 
          icon: 'UserCheck', 
          label: 'Attendance', 
          path: '/teacher/attendance',
          permission: { action: 'create' as const, subject: 'Attendance' as const }
        },
        { 
          icon: 'FileText', 
          label: 'Assignments', 
          path: '/teacher/assignments',
          permission: { action: 'create' as const, subject: 'Assignment' as const }
        },
        { 
          icon: 'BarChart3', 
          label: 'Analytics', 
          path: '/teacher/analytics',
          permission: { action: 'read' as const, subject: 'Report' as const }
        }
      ];
    }

    if (user?.role === 'student') {
      return [
        ...baseItems,
        { 
          icon: 'BookOpen', 
          label: 'Courses', 
          path: '/student/courses',
          permission: { action: 'read' as const, subject: 'Assignment' as const }
        },
        { 
          icon: 'Calendar', 
          label: 'Schedule', 
          path: '/student/schedule',
          permission: { action: 'read' as const, subject: 'Timetable' as const }
        },
        { 
          icon: 'FileText', 
          label: 'Assignments', 
          path: '/student/assignments',
          permission: { action: 'submit' as const, subject: 'Assignment' as const }
        },
        { 
          icon: 'BarChart3', 
          label: 'Grades', 
          path: '/student/grades',
          permission: { action: 'read' as const, subject: 'Grade' as const }
        }
      ];
    }

    return baseItems;
  };

  const getFilteredMenuItems = () => {
    return getMenuItems().filter(item => 
      can(item.permission.action, item.permission.subject)
    );
  };

  return {
    menuItems: getFilteredMenuItems(),
    rawMenuItems: getMenuItems(),
    user
  };
}
