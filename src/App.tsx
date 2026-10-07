import React, { useState } from 'react';
import { useSchoolStore } from './context/useSchoolStore';
import { AppShellLayout } from './components/layout/AppShellLayout';
import { AuthModule } from './components/auth/AuthModule';
import { AdminPortal } from './components/admin/AdminPortal';
import { EducatorPortal } from './components/educator/EducatorPortal';
import { StudentPortal } from './components/student/StudentPortal';
import { ParentPortal } from './components/parent/ParentPortal';

export const App: React.FC = () => {
  const {
    currentUser,
    currentRole,
  } = useSchoolStore();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Automatically reset active tab to role primary view on switch
  const [prevRole, setPrevRole] = useState(currentRole);
  if (prevRole !== currentRole) {
    setPrevRole(currentRole);
    setActiveTab(currentRole === 'teacher' ? 'workspace' : 'overview');
  }

  if (!isAuthenticated) {
    return <AuthModule onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  // Dynamic role-specific navigation tabs for sidebar and mobile bottom bar
  const getNavItemsForRole = () => {
    switch (currentRole) {
      case 'admin':
        return [
          { id: 'overview', label: 'Dashboard', icon: '📊' },
          { id: 'academics', label: 'Academics', icon: '📚' },
          { id: 'students', label: 'Directory', icon: '🎓' },
          { id: 'payroll', label: 'Payroll', icon: '💵' },
          { id: 'finance', label: 'Finance', icon: '💳' },
          { id: 'logistics', label: 'Fleet GPS', icon: '🚌' },
        ];
      case 'teacher':
        return [
          { id: 'workspace', label: 'Workspace', icon: '📊' },
          { id: 'attendance', label: 'Attendance', icon: '📋' },
          { id: 'gradebook', label: 'Gradebook', icon: '📝' },
          { id: 'homework', label: 'Homework', icon: '📚' },
          { id: 'conduct', label: 'Conduct & Leave', icon: '⚖️' },
        ];
      case 'student':
        return [
          { id: 'overview', label: 'Activity', icon: '⚡' },
          { id: 'homework', label: 'Locker', icon: '📁' },
          { id: 'schedule', label: 'Timetable', icon: '🗓️' },
          { id: 'analytics', label: 'Report Card', icon: '📈' },
          { id: 'library', label: 'Library', icon: '📖' },
        ];
      case 'parent':
      default:
        return [
          { id: 'overview', label: 'Ward Feed', icon: '👨‍👩‍👧' },
          { id: 'bustracker', label: 'Bus GPS', icon: '🚌' },
          { id: 'fees', label: 'Tuition Fees', icon: '💳' },
          { id: 'messaging', label: 'Teachers', icon: '💬' },
          { id: 'leave', label: 'Absence Slips', icon: '📝' },
        ];
    }
  };

  const navItems = getNavItemsForRole();

  return (
    <AppShellLayout
      activeNavTab={activeTab}
      onNavTabChange={setActiveTab}
      title={`${currentRole?.toUpperCase()} Workspace`}
      subtitle={`Welcome back, ${currentUser?.name}`}
      onLogout={() => setIsAuthenticated(false)}
      navItems={navItems}
    >
      {currentRole === 'admin' ? (
        <AdminPortal activeTab={activeTab} onTabChange={setActiveTab} />
      ) : currentRole === 'teacher' ? (
        <EducatorPortal activeTab={activeTab} onTabChange={setActiveTab} />
      ) : currentRole === 'student' ? (
        <StudentPortal activeTab={activeTab} onTabChange={setActiveTab} />
      ) : (
        <ParentPortal activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </AppShellLayout>
  );
};
