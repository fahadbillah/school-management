import { useSchoolStore } from '../../context/useSchoolStore';
import { BottomNavigation, Avatar, Badge, Button } from 'react-component-library';
import type { BottomNavItemConfig } from 'react-component-library';

export interface AppShellLayoutProps {
  children: React.ReactNode;
  activeNavTab: string;
  onNavTabChange: (tabId: string) => void;
  title: string;
  subtitle?: string;
  onLogout?: () => void;
  navItems: { id: string; label: string; icon: React.ReactNode; badge?: string | number }[];
}

export const AppShellLayout: React.FC<AppShellLayoutProps> = ({
  children,
  activeNavTab,
  onNavTabChange,
  title,
  subtitle,
  onLogout,
  navItems,
}) => {
  const { currentUser, switchRole, isMobile, toast, clearToast, resetDemoData } = useSchoolStore();

  const bottomNavConfig: BottomNavItemConfig[] = navItems.slice(0, 5).map((item) => ({
    id: item.id,
    label: item.label,
    icon: item.icon,
    badge: item.badge,
  }));

  return (
    <div className="school-app-wrapper">
      {/* Toast Overlay */}
      {toast && (
        <div className={`school-toast school-toast-${toast.type || 'info'}`} role="status">
          <span>{toast.message}</span>
          <button className="school-toast-close" onClick={clearToast} aria-label="Close notification">
            ×
          </button>
        </div>
      )}

      {/* Main Split-Pane or Column Container */}
      <div className="school-layout-container">
        {/* Permanent Side Panel for Tablet and Desktop (viewport >= 600px) */}
        {!isMobile && (
          <aside className="school-sidebar-panel" aria-label="Main Navigation">
            <div className="school-sidebar-brand">
              <div className="brand-crest">🏫</div>
              <div className="brand-details">
                <h2 className="brand-name">Merit Academy</h2>
                <span className="brand-edition">K-12 Portal</span>
              </div>
            </div>

            {/* Quick Persona Bar */}
            <div className="sidebar-persona-chip">
              <Avatar
                src={currentUser?.avatar}
                name={currentUser?.name || 'User'}
                size="md"
              />
              <div className="persona-info">
                <span className="persona-name">{currentUser?.name}</span>
                <Badge variant={currentUser?.role === 'admin' ? 'info' : currentUser?.role === 'teacher' ? 'success' : currentUser?.role === 'student' ? 'neutral' : 'warning'}>
                  {currentUser?.role.toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="sidebar-nav-list">
              {navItems.map((item) => {
                const isActive = activeNavTab === item.id;
                return (
                  <button
                    key={item.id}
                    className={`sidebar-nav-btn ${isActive ? 'active' : ''}`}
                    onClick={() => onNavTabChange(item.id)}
                  >
                    <span className="nav-btn-icon">{item.icon}</span>
                    <span className="nav-btn-label">{item.label}</span>
                    {item.badge && (
                      <span className="nav-btn-badge">{item.badge}</span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Role Switcher Footer */}
            <div className="sidebar-footer-roles">
              <div className="role-switch-title">Quick Demo Switch:</div>
              <div className="role-pill-group">
                <button
                  className={`role-micro-pill ${currentUser?.role === 'admin' ? 'active' : ''}`}
                  onClick={() => switchRole('admin')}
                >
                  Admin
                </button>
                <button
                  className={`role-micro-pill ${currentUser?.role === 'teacher' ? 'active' : ''}`}
                  onClick={() => switchRole('teacher')}
                >
                  Teacher
                </button>
                <button
                  className={`role-micro-pill ${currentUser?.role === 'student' ? 'active' : ''}`}
                  onClick={() => switchRole('student')}
                >
                  Student
                </button>
                <button
                  className={`role-micro-pill ${currentUser?.role === 'parent' ? 'active' : ''}`}
                  onClick={() => switchRole('parent')}
                >
                  Parent
                </button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                style={{ width: '100%', marginTop: '8px', color: '#94a3b8' }}
                onClick={resetDemoData}
              >
                🔄 Reset Demo Data
              </Button>

              {onLogout && (
                <Button
                  variant="ghost"
                  size="sm"
                  style={{ width: '100%', marginTop: '4px' }}
                  onClick={onLogout}
                >
                  Sign Out / Switch Mode
                </Button>
              )}
            </div>
          </aside>
        )}

        {/* Content View Area */}
        <div className="school-main-content">
          {/* Top Header Bar */}
          <header className="school-top-appbar">
            <div className="appbar-title-group">
              <h1 className="appbar-title">{title}</h1>
              {subtitle && <p className="appbar-subtitle">{subtitle}</p>}
            </div>

            <div className="appbar-actions">
              {/* Role Indicator Chip on Mobile */}
              {isMobile && (
                <div className="mobile-persona-pill" onClick={() => onLogout?.()}>
                  <Avatar
                    src={currentUser?.avatar}
                    name={currentUser?.name || 'User'}
                    size="sm"
                  />
                  <span className="mobile-role-label">{currentUser?.role}</span>
                </div>
              )}

              {/* Demo Role Switch Dropdown for quick access */}
              <div className="quick-persona-badge">
                <Badge variant={currentUser?.role === 'admin' ? 'info' : currentUser?.role === 'teacher' ? 'success' : currentUser?.role === 'student' ? 'neutral' : 'warning'}>
                  {currentUser?.badge || currentUser?.role}
                </Badge>
              </div>
            </div>
          </header>

          {/* Body Content */}
          <main className="school-view-scroll-body">
            {children}
          </main>

          {/* Persistent Mobile Bottom Navigation Bar (viewport < 600px) */}
          {isMobile && (
            <div className="school-bottom-nav-fixed">
              <BottomNavigation
                items={bottomNavConfig}
                value={activeNavTab}
                onChange={onNavTabChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
