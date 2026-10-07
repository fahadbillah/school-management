import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  BottomNavigation,
  NavigationRail,
  Breadcrumb,
  MobileWayfinding,
  AppNavbar,
} from './Navigation';
import {
  HomeIcon,
  CalendarIcon,
  BookOpenIcon,
  BellIcon,
  LayersIcon,
  SettingsIcon,
  SearchIcon,
  UserFallbackIcon,
} from '../common/Icons';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Avatar } from '../Avatar';

const meta: Meta = {
  title: 'Navigation/AppNavigationArchitecture',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

/**
 * Section 07 Pattern 1: Mobile Bottom Tab Bar (Height: 80px M3 Baseline)
 * Compact mobile bottom navigation with active pill background (#D1F8EF), active primary fill (#3674B5), and notification counter badges.
 */
export const MobileBottomNavigation: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('attendance');

    const items = [
      { id: 'home', label: 'Home', icon: <HomeIcon size={20} /> },
      {
        id: 'attendance',
        label: 'Attendance',
        icon: <CalendarIcon size={20} />,
      },
      { id: 'academics', label: 'Academics', icon: <BookOpenIcon size={20} /> },
      {
        id: 'messages',
        label: 'Messages',
        icon: <BellIcon size={20} />,
        badge: 2,
      },
    ];

    return (
      <div style={{ maxWidth: 420, margin: '0 auto', padding: '24px 0' }}>
        <div style={{ marginBottom: 12 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#334155',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Compact Mobile Bottom Tab Bar (Height: 80px)
          </span>
        </div>
        <BottomNavigation
          value={activeTab}
          onChange={setActiveTab}
          items={items}
        />
      </div>
    );
  },
};

/**
 * Section 07 Pattern 2: Adaptive Tablet & Desktop Navigation Rail
 * 80px width adaptive rail unit with brand mark, active indicator styling, and dark/light shell themes.
 */
export const AdaptiveNavigationRail: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('users');

    const items = [
      { id: 'dashboard', icon: <LayersIcon size={18} />, title: 'Dashboard' },
      { id: 'users', icon: <BookOpenIcon size={18} />, title: 'Cohort Roster' },
      { id: 'settings', icon: <SettingsIcon size={18} />, title: 'Settings' },
    ];

    return (
      <div
        style={{
          display: 'flex',
          gap: 32,
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}
      >
        {/* Dark Theme Rail Horizontal Preview (Stitch Section 07 Spec) */}
        <div style={{ flex: '1 1 360px', maxWidth: 480 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#334155',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'block',
              marginBottom: 12,
            }}
          >
            Expanded Tablet Rail Unit (Dark Theme Preview)
          </span>
          <NavigationRail
            theme="dark"
            orientation="horizontal"
            brand="CP"
            brandTitle="Adaptive Tablet Rail Component"
            value={activeItem}
            onChange={setActiveItem}
            items={items}
          />
        </div>

        {/* Light Theme Rail Vertical Sidebar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#334155',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 12,
            }}
          >
            Vertical Rail (Light)
          </span>
          <div style={{ height: 320 }}>
            <NavigationRail
              theme="light"
              orientation="vertical"
              brand={<span style={{ fontWeight: 800 }}>CP</span>}
              value={activeItem}
              onChange={setActiveItem}
              items={items}
              footer={
                <button
                  type="button"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    border: '1px solid #E2E8F0',
                    backgroundColor: '#F8FAFC',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Profile"
                >
                  <UserFallbackIcon size={18} />
                </button>
              }
            />
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Section 06: Breadcrumb Navigation Trail
 * Deep-linking and hierarchical wayfinding trails with primary Stitch card styling and secondary mono variants.
 */
export const BreadcrumbNavigationTrail: Story = {
  render: () => {
    const primaryTrail = [
      {
        id: 'home',
        label: 'Home',
        icon: <HomeIcon size={12} />,
        href: '#home',
      },
      { id: 'ops', label: 'Operations', href: '#ops' },
      { id: 'class', label: 'Grade 10-A Biology', isCurrent: true },
    ];

    const secondaryTrail = [
      { id: 'sis', label: 'SIS-Root', href: '#root' },
      { id: 'section', label: 'Section-3', href: '#sec' },
      { id: 'rollcall', label: 'Rollcall Register', isCurrent: true },
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          maxWidth: 600,
        }}
      >
        <div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#334155',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'block',
              marginBottom: 8,
            }}
          >
            Interactive Breadcrumb Trail (Primary Card Variant)
          </span>
          <Breadcrumb variant="primary" items={primaryTrail} />
        </div>

        <div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#334155',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'block',
              marginBottom: 8,
            }}
          >
            Secondary Mono Variant (SIS Wayfinding)
          </span>
          <Breadcrumb variant="subtle" separator=">" items={secondaryTrail} />
        </div>
      </div>
    );
  },
};

/**
 * Section 09 Pattern 2: Mobile Compressed Wayfinding (Height: 48px Header)
 * Prevents multi-line wrapping with a 2-button ergonomic header: Single-tap Back-Step Pill + Contextual Sheet/Popover Trigger with complete hierarchy step list.
 */
export const MobileCompressedWayfinding: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(3);

    const hierarchyPath = [
      { id: 'sis', label: 'SIS-Root' },
      { id: 'classes', label: 'All Classes' },
      { id: 'grade', label: 'Grade 10-A' },
      { id: 'period', label: 'Period 3: Rollcall Register' },
    ];

    return (
      <div style={{ maxWidth: 440, margin: '0 auto', padding: '16px 0' }}>
        <div
          style={{
            marginBottom: 12,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#3674B5',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Mobile Adapted Wayfinding (Height: 48px Header)
          </span>
          <Badge variant="success">Single-Tap Parent Navigation</Badge>
        </div>

        <MobileWayfinding
          parentLabel="Grade 10-A"
          currentLabel={
            hierarchyPath[currentStep - 1]?.label || 'Period 3: Rollcall'
          }
          path={hierarchyPath}
          currentStepIndex={currentStep}
          totalSteps={4}
          onBack={() => {
            if (currentStep > 1) setCurrentStep((prev) => prev - 1);
          }}
          onStepClick={(_step, index) => {
            setCurrentStep(index + 1);
          }}
        />
      </div>
    );
  },
};

/**
 * Desktop & Mobile App Navigation Bar (AppNavbar)
 * Full responsive institutional navigation header with brand identity, horizontal dropdown menus, search bar trigger, alerts, and mobile drawer.
 */
export const FullAppNavbarArchitecture: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    const menuItems = [
      { id: 'dashboard', label: 'Dashboard' },
      {
        id: 'academic',
        label: 'Academic Operations',
        subItems: [
          { id: 'courses', label: 'Master Courses & Modules' },
          { id: 'gradebook', label: 'Gradebook & Assessment', badge: 'Active' },
          { id: 'attendance', label: 'Daily Rollcall Register' },
        ],
      },
      { id: 'roster', label: 'Cohort Roster' },
      { id: 'reports', label: 'Institutional Reports' },
    ];

    return (
      <div
        style={{
          border: '1px solid #E2E8F0',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        }}
      >
        <AppNavbar
          brandLogo="CP"
          brandName="Campus Operations"
          brandSubtitle="Executive Command & Operations Hub"
          menuItems={menuItems}
          activeItemId={activeTab}
          onItemClick={(id) => setActiveTab(id)}
          actions={
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<SearchIcon size={14} />}
                style={{ height: 36, fontSize: 12, gap: 8 }}
              >
                Quick Search{' '}
                <kbd
                  style={{
                    padding: '1px 5px',
                    background: '#F1F5F9',
                    borderRadius: 4,
                    fontSize: 10,
                  }}
                >
                  ⌘K
                </kbd>
              </Button>

              <button
                type="button"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  border: '1px solid #E2E8F0',
                  background: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  color: '#475569',
                }}
                aria-label="Notifications"
              >
                <BellIcon size={18} />
                <span
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#F43F5E',
                  }}
                />
              </button>

              <Avatar size="sm" name="Sophia Miller" status="online" />
            </div>
          }
        />

        <div
          style={{
            padding: 32,
            backgroundColor: '#F8FAFC',
            minHeight: 180,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
            fontSize: 14,
          }}
        >
          <span>
            Active View: <strong>{activeTab.toUpperCase()}</strong>
          </span>
        </div>
      </div>
    );
  },
};
