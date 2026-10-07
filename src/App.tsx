import React, { useState } from 'react';
import { useSchoolStore } from './context/useSchoolStore';
import { AppShellLayout } from './components/layout/AppShellLayout';
import { StatCard, Card, CardHeader, CardTitle, CardContent, Badge, Button } from 'react-component-library';
import { AuthModule } from './components/auth/AuthModule';
import { AdminPortal } from './components/admin/AdminPortal';
import { EducatorPortal } from './components/educator/EducatorPortal';

export const App: React.FC = () => {
  const {
    currentUser,
    currentRole,
    switchRole,
    students,
    faculty,
    classes,
    fees,
    attendance,
  } = useSchoolStore();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAuthenticated) {
    return <AuthModule onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const navItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'students', label: 'Students', icon: '🎓', badge: students.length },
    { id: 'academics', label: 'Academics', icon: '📚' },
    { id: 'finance', label: 'Finance', icon: '💳' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const presentCount = attendance.filter((a) => a.status === 'present').length;
  const attendanceRate = Math.round((presentCount / (attendance.length || 1)) * 100);

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
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Metric Cards Row */}
        <div className="grid-4col">
          <StatCard
            title="Total Students"
            value={students.length.toString()}
            trend={{ direction: 'up', value: '+4% this term' }}
          />
          <StatCard
            title="Faculty Roster"
            value={faculty.length.toString()}
            trend={{ direction: 'neutral', value: 'Full capacity' }}
          />
          <StatCard
            title="Daily Attendance"
            value={`${attendanceRate}%`}
            trend={{ direction: 'up', value: 'On track' }}
          />
          <StatCard
            title="Fee Collection"
            value={`$${fees.filter((f) => f.status === 'paid').reduce((acc, f) => acc + f.totalAmount, 0).toLocaleString()}`}
            trend={{ direction: 'up', value: '82% collected' }}
          />
        </div>

        {/* Quick Operational Panel */}
        <div className="grid-2col">
          <Card elevation={1}>
            <CardHeader bordered>
              <CardTitle>Active Class Allocations</CardTitle>
              <Badge variant="info">{classes.length} Sections</Badge>
            </CardHeader>
            <CardContent>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {classes.map((cls) => (
                  <div
                    key={cls.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px',
                      background: 'var(--app-bg)',
                      borderRadius: '8px',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>
                        {cls.grade} - {cls.section}
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>
                        Lead: {cls.leadTeacherName}
                      </div>
                    </div>
                    <Badge variant="neutral">{cls.enrolled} / {cls.capacity} Enrolled</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card elevation={1}>
            <CardHeader bordered>
              <CardTitle>Multi-Role Switchboard</CardTitle>
              <Badge variant="success">Client Mock Mode</Badge>
            </CardHeader>
            <CardContent>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                Seamlessly toggle between administrative and student/parent portals to test reactive client state synchronization:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => switchRole('admin')}
                >
                  Admin Control Tower
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => switchRole('teacher')}
                >
                  Educator Workspace
                </Button>
                <Button
                  variant={currentRole === 'student' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => switchRole('student')}
                >
                  Student Activity
                </Button>
                <Button
                  variant={currentRole === 'parent' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => switchRole('parent')}
                >
                  Parent Portal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      )}
    </AppShellLayout>
  );
};
