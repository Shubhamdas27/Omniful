import { ReactNode } from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import { Actions, Subjects } from '../../lib/permissions';

interface CanProps {
  action: Actions;
  subject: Subjects;
  field?: any;
  children: ReactNode;
  fallback?: ReactNode;
}

export function Can({ action, subject, field, children, fallback = null }: CanProps) {
  const { can } = usePermissions();

  if (can(action, subject, field)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

interface CannotProps {
  action: Actions;
  subject: Subjects;
  field?: any;
  children: ReactNode;
  fallback?: ReactNode;
}

export function Cannot({ action, subject, field, children, fallback = null }: CannotProps) {
  const { cannot } = usePermissions();

  if (cannot(action, subject, field)) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

// Higher Order Component for protecting routes/components
interface ProtectedProps {
  action: Actions;
  subject: Subjects;
  field?: any;
  children: ReactNode;
  fallback?: ReactNode;
}

export function Protected({ action, subject, field, children, fallback }: ProtectedProps) {
  const { can } = usePermissions();

  if (!can(action, subject, field)) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have permission to access this resource.
          </p>
          {fallback && <div className="mt-4">{fallback}</div>}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Role-based component wrapper
interface RoleGateProps {
  allowedRoles: string[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function RoleGate({ allowedRoles, children, fallback = null }: RoleGateProps) {
  const { user } = usePermissions() as any;

  if (!user || !allowedRoles.includes(user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
