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

  if (!isAuthenticated) {
    return <AuthModule onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'academics', label: 'Academics', icon: '📚' },
    { id: 'communication', label: 'Messages', icon: '💬' },
    { id: 'transit', label: 'Logistics', icon: '🚌' },
    { id: 'finance', label: 'Ledger', icon: '💳' },
  ];

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
        <AdminPortal />
      ) : currentRole === 'teacher' ? (
        <EducatorPortal />
      ) : currentRole === 'student' ? (
        <StudentPortal />
      ) : (
        <ParentPortal />
      )}
    </AppShellLayout>
  );
};
