import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, Dropdown } from 'react-component-library';
import { useSchoolStore } from '../../context/useSchoolStore';
import type { UserRole } from '../../types/models';

interface AuthModuleProps {
  onAuthenticated: () => void;
}

type AuthStep = 'splash' | 'role_select' | 'credentials';

export const AuthModule: React.FC<AuthModuleProps> = ({ onAuthenticated }) => {
  const { profiles, setCurrentUser, showToast } = useSchoolStore();
  const [step, setStep] = useState<AuthStep>('splash');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [institutionCode, setInstitutionCode] = useState('MERIT-2026');
  const [userId, setUserId] = useState('admin@meritacademy.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const roleProfiles = {
    admin: profiles.find((p) => p.role === 'admin') || profiles[0],
    teacher: profiles.find((p) => p.role === 'teacher') || profiles[1],
    student: profiles.find((p) => p.role === 'student') || profiles[2],
    parent: profiles.find((p) => p.role === 'parent') || profiles[3],
  };

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    const profile = roleProfiles[role];
    if (profile) {
      setUserId(profile.email);
    }
  };

  const handleQuickFill = (profileId: string) => {
    const prof = profiles.find((p) => p.id === profileId);
    if (prof) {
      setSelectedRole(prof.role);
      setUserId(prof.email);
      setInstitutionCode(prof.institutionCode);
    }
  };

  const handleSignIn = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const activeProf = profiles.find((p) => p.email === userId) || roleProfiles[selectedRole];
      setCurrentUser(activeProf);
      setIsLoading(false);
      showToast(`Authenticated as ${activeProf.badge}: ${activeProf.name}`);
      onAuthenticated();
    }, 600);
  };

  const handleExploreDemo = () => {
    const defaultAdmin = roleProfiles.admin;
    setCurrentUser(defaultAdmin);
    showToast(`Entered demo environment as ${defaultAdmin.name} (${defaultAdmin.badge})`);
    onAuthenticated();
  };

  return (
    <div className="auth-flow-container">
      {/* Step 1: Splash and Onboarding Screen */}
      {step === 'splash' && (
        <Card elevation={2} className="auth-card-step">
          <CardHeader style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="auth-emblem">🏫</div>
            <CardTitle style={{ fontSize: '24px', marginTop: '12px' }}>Merit Academy</CardTitle>
            <p className="auth-tagline">Integrated K-12 Institutional Management Platform</p>
          </CardHeader>

          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="auth-feature-pills">
              <div className="feature-pill">
                <span className="pill-icon">🏛️</span>
                <div>
                  <strong>Administrative Tower</strong>
                  <p>Admissions, faculty rosters, payroll & logistical fleet</p>
                </div>
              </div>
              <div className="feature-pill">
                <span className="pill-icon">👩‍🏫</span>
                <div>
                  <strong>Educator Workspace</strong>
                  <p>Rapid attendance, gradebook marks & conduct logs</p>
                </div>
              </div>
              <div className="feature-pill">
                <span className="pill-icon">🎒</span>
                <div>
                  <strong>Student & Parent Portals</strong>
                  <p>Coursework lockers, GPS transit tracking & digital fees</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
              <Button
                variant="primary"
                size="lg"
                style={{ width: '100%' }}
                onClick={() => setStep('role_select')}
              >
                Get Started
              </Button>
              <Button
                variant="ghost"
                size="md"
                style={{ width: '100%' }}
                onClick={handleExploreDemo}
              >
                Explore Demo Environment (One-Click)
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Role Selector Screen */}
      {step === 'role_select' && (
        <Card elevation={2} className="auth-card-step">
          <CardHeader bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <CardTitle>Select Demonstration Persona</CardTitle>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                  Choose your role to load role-specific views and mock context.
                </p>
              </div>
              <Badge variant="info">Step 2 of 3</Badge>
            </div>
          </CardHeader>

          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="role-selector-grid">
              {/* Admin */}
              <div
                className={`role-select-box ${selectedRole === 'admin' ? 'selected' : ''}`}
                onClick={() => handleSelectRole('admin')}
              >
                <div className="role-box-icon">🏛️</div>
                <div className="role-box-details">
                  <div className="role-box-title">Administrator</div>
                  <div className="role-box-desc">Executive oversight, admissions & finance</div>
                  <Badge variant="info" size="sm">Full Authority</Badge>
                </div>
              </div>

              {/* Teacher */}
              <div
                className={`role-select-box ${selectedRole === 'teacher' ? 'selected' : ''}`}
                onClick={() => handleSelectRole('teacher')}
              >
                <div className="role-box-icon">🧑‍🏫</div>
                <div className="role-box-details">
                  <div className="role-box-title">Educator</div>
                  <div className="role-box-desc">Attendance, grading, assignments & notes</div>
                  <Badge variant="success" size="sm">Class Advisor</Badge>
                </div>
              </div>

              {/* Student */}
              <div
                className={`role-select-box ${selectedRole === 'student' ? 'selected' : ''}`}
                onClick={() => handleSelectRole('student')}
              >
                <div className="role-box-icon">🎒</div>
                <div className="role-box-details">
                  <div className="role-box-title">Student</div>
                  <div className="role-box-desc">Locker, timetable, report card & library</div>
                  <Badge variant="neutral" size="sm">Learner Access</Badge>
                </div>
              </div>

              {/* Parent */}
              <div
                className={`role-select-box ${selectedRole === 'parent' ? 'selected' : ''}`}
                onClick={() => handleSelectRole('parent')}
              >
                <div className="role-box-icon">👨‍👩‍👧</div>
                <div className="role-box-details">
                  <div className="role-box-title">Parent / Guardian</div>
                  <div className="role-box-desc">Multi-ward switcher, bus GPS & fee pay</div>
                  <Badge variant="warning" size="sm">Family Guardian</Badge>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <Button
                variant="ghost"
                size="md"
                onClick={() => setStep('splash')}
              >
                Back
              </Button>
              <Button
                variant="primary"
                size="md"
                style={{ flex: 1 }}
                onClick={() => setStep('credentials')}
              >
                Continue as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Authentication Form Screen */}
      {step === 'credentials' && (
        <Card elevation={2} className="auth-card-step">
          <CardHeader bordered>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <CardTitle>Sign In with Mock Credentials</CardTitle>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                  Pre-configured authentication credentials for client demonstrations.
                </p>
              </div>
              <Badge variant="success">Ready</Badge>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Dropdown
                label="Demo Persona Quick-Fill"
                value={roleProfiles[selectedRole]?.id}
                onChange={(val) => handleQuickFill(val)}
                options={profiles.map((p) => ({
                  value: p.id,
                  label: `${p.name} (${p.badge})`,
                }))}
              />

              <Input
                label="Institution Code"
                value={institutionCode}
                onChange={(e) => setInstitutionCode(e.target.value)}
                placeholder="e.g. MERIT-2026"
                required
              />

              <Input
                label="User ID / Registered Email"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="name@meritacademy.edu"
                required
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <Button
                  variant="ghost"
                  size="md"
                  type="button"
                  onClick={() => setStep('role_select')}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  disabled={isLoading}
                  style={{ flex: 1 }}
                >
                  {isLoading ? 'Verifying Credentials...' : `Sign In as ${selectedRole.toUpperCase()}`}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
