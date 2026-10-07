import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  PageShell,
  PageContainer,
  PageBody,
  PageHeader,
  SubNavStrip,
  PageHero,
  CardSlot,
  PageFooter,
} from './Layout';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Tabs } from '../Tabs';
import { ChevronLeftIcon } from '../common/Icons';

const meta: Meta = {
  title: 'Templates/PageContainers',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

/**
 * Variant A: Standard Blank Page Template (Clean Hub Template)
 * Universal hub layout: Persistent global header, central responsive 1280px container, and institutional footer.
 */
export const StandardHubTemplate: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
      { id: 'overview', label: 'Overview' },
      { id: 'courses', label: 'Courses' },
      { id: 'roster', label: 'Roster' },
      { id: 'reports', label: 'Reports' },
    ];

    return (
      <PageShell>
        {/* Sticky Global Top Header */}
        <PageHeader>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ui-space-md)',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: 'var(--ui-primary)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              CP
            </div>
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontFamily: 'var(--ui-font-display)',
                    fontSize: 16,
                  }}
                >
                  Campus Operations
                </span>
                <Badge variant="neutral">PORTAL</Badge>
              </div>
              <span style={{ fontSize: 12, color: 'var(--ui-text-muted)' }}>
                Academic Command & Operations Hub
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ui-space-lg)',
            }}
          >
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onChange={setActiveTab}
              variant="pill"
              size="sm"
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                borderLeft: '1px solid var(--ui-border)',
                paddingLeft: 16,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: 'var(--ui-surface-container)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: 12,
                }}
              >
                RV
              </div>
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Dr. Vance</div>
                <div style={{ fontSize: 11, color: 'var(--ui-text-muted)' }}>
                  Registrar / Admin
                </div>
              </div>
            </div>
          </div>
        </PageHeader>

        {/* Content Body Slot with 24px/32px Gutter Rhythm */}
        <PageBody>
          <PageContainer maxWidth="standard">
            {/* Guide Bounding Box for Wireframe / Main Body */}
            <CardSlot
              style={{
                minHeight: '440px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderStyle: 'dashed',
                borderWidth: '2px',
                borderColor: 'var(--ui-structural-outline)',
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                textAlign: 'center',
                padding: '48px 24px',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  backgroundColor: 'var(--ui-color-info-bg)',
                  color: 'var(--ui-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                  fontSize: 24,
                }}
              >
                📑
              </div>
              <h2
                style={{
                  margin: '0 0 8px 0',
                  fontFamily: 'var(--ui-font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                }}
              >
                [Main Content Slot • Body Container]
              </h2>
              <p
                style={{
                  margin: '0 0 24px 0',
                  color: 'var(--ui-text-muted)',
                  maxWidth: 520,
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                }}
              >
                Inject dashboard widgets, data tables, metrics, forms, or
                assessment rosters here. Retains natural 24px/32px vertical
                rhythm.
              </p>
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                }}
              >
                <Button variant="primary">Add Section</Button>
                <Button variant="secondary">Import Data</Button>
              </div>
            </CardSlot>
          </PageContainer>
        </PageBody>

        {/* Institutional Pinned Footer */}
        <PageFooter>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'var(--ui-color-success)',
                display: 'inline-block',
              }}
            />
            <span>CampusPulse SIS v3.4 • All Academic Systems Operational</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span>Privacy Policy</span>
            <span>FERPA Compliance</span>
            <span>Support Desk</span>
            <span>© 2026 CampusPulse</span>
          </div>
        </PageFooter>
      </PageShell>
    );
  },
};

/**
 * Variant B: Sub-Page / Detail Blank Page Template
 * Drill-down workflow: 48px Secondary Nav Strip (Back CTA + Breadcrumbs), Hero Title Strip with Actions, Bounded Body Slot.
 */
export const DetailSubPageTemplate: Story = {
  render: () => {
    return (
      <PageShell>
        {/* Sticky Global Top Header */}
        <PageHeader>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ui-space-md)',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                backgroundColor: 'var(--ui-primary)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              CP
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    fontWeight: 700,
                    fontFamily: 'var(--ui-font-display)',
                    fontSize: 16,
                  }}
                >
                  Campus Operations
                </span>
                <Badge variant="neutral">FACULTY</Badge>
              </div>
              <span style={{ fontSize: 12, color: 'var(--ui-text-muted)' }}>
                Curricular Management & Student Portals
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Button size="sm" variant="secondary">
              + New Entry
            </Button>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: 'var(--ui-surface-container)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: 12,
              }}
            >
              AT
            </div>
          </div>
        </PageHeader>

        {/* 48px Secondary Navigation Band: Back CTA & Breadcrumbs */}
        <SubNavStrip>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                border: '1px solid var(--ui-border)',
                background: 'white',
                borderRadius: 6,
                padding: '4px 10px',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                color: 'var(--ui-text-high)',
              }}
            >
              <ChevronLeftIcon /> Back
            </button>
            <nav
              style={{
                fontSize: 13,
                color: 'var(--ui-text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span>Dashboard</span>
              <span>/</span>
              <span>Courses & Cohorts</span>
              <span>/</span>
              <span style={{ fontWeight: 600, color: 'var(--ui-text-high)' }}>
                Biology Grade 10-A
              </span>
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Badge variant="success">Active Session</Badge>
            <span
              style={{
                fontSize: 12,
                color: 'var(--ui-text-muted)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              ID: SEC-10A-BIO
            </span>
          </div>
        </SubNavStrip>

        {/* Page Hero Strip: Title, Subtitle, and Action CTAs */}
        <PageHero
          title="Biology Grade 10-A: Course Master"
          subtitle="Section CRN 4082 • Academic Term Fall 2026 • 28 Active Students"
          actions={
            <>
              <Button variant="secondary" size="md">
                Export Ledger
              </Button>
              <Button variant="primary" size="md">
                Save Changes
              </Button>
            </>
          }
        />

        {/* Main Content Body */}
        <PageBody>
          <PageContainer maxWidth="standard">
            <CardSlot
              style={{
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderStyle: 'dashed',
                borderWidth: '2px',
                borderColor: 'var(--ui-structural-outline)',
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                textAlign: 'center',
                padding: '48px 24px',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  backgroundColor: 'var(--ui-color-info-bg)',
                  color: 'var(--ui-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                  fontSize: 24,
                }}
              >
                🔬
              </div>
              <h2
                style={{
                  margin: '0 0 8px 0',
                  fontFamily: 'var(--ui-font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                }}
              >
                [Detail Body Slot • Nested Content Area]
              </h2>
              <p
                style={{
                  margin: '0 0 24px 0',
                  color: 'var(--ui-text-muted)',
                  maxWidth: 540,
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                }}
              >
                Optimized for single student evaluation rubrics, gradebook
                matrices, attendance registers, or enrollment forms that require
                quick hierarchical back navigation.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <Button variant="secondary">Configure Matrix</Button>
                <Button variant="primary">Add Students</Button>
              </div>
            </CardSlot>
          </PageContainer>
        </PageBody>

        {/* Pinned Institutional Footer */}
        <PageFooter>
          <span>CampusPulse SIS • Audit Log ID: 0928-TX</span>
          <div style={{ display: 'flex', gap: 16 }}>
            <span>Documentation</span>
            <span>Classroom Help</span>
            <span>© 2026 CampusPulse</span>
          </div>
        </PageFooter>
      </PageShell>
    );
  },
};

/**
 * Variant C: Mobile Blank Viewport Adaptation (~390px Viewport Frame)
 * Emulates mobile edge-safe padding (16px), touch ergonomics (≥44px), and bottom pinned controls.
 */
export const MobileBlankViewportTemplate: Story = {
  render: () => {
    return (
      <div
        style={{
          padding: '24px',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            width: '390px',
            minHeight: '780px',
            borderRadius: '36px',
            border: '8px solid #1e293b',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: 'var(--ui-background)',
          }}
        >
          {/* Mobile Top Bar */}
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'white',
              borderBottom: '1px solid var(--ui-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  backgroundColor: 'var(--ui-primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                CP
              </div>
              <span style={{ fontWeight: 700, fontSize: 14 }}>CampusPulse</span>
            </div>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: 'var(--ui-surface-container)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              RV
            </div>
          </div>

          {/* Mobile Scrollable Body Area */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardSlot
              style={{
                flex: 1,
                borderStyle: 'dashed',
                borderWidth: '2px',
                borderColor: 'var(--ui-structural-outline)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '24px 16px',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: 'var(--ui-color-info-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  marginBottom: 12,
                }}
              >
                📱
              </div>
              <h3
                style={{
                  margin: '0 0 6px 0',
                  fontFamily: 'var(--ui-font-display)',
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                Mobile Body Container
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: 'var(--ui-text-muted)',
                  lineHeight: 1.4,
                }}
              >
                Edge-safe mobile viewport padding for high-density cards and
                scroll views.
              </p>
            </CardSlot>
          </div>

          {/* Bottom Fixed Navigation Bar */}
          <div
            style={{
              padding: '12px 16px',
              backgroundColor: 'white',
              borderTop: '1px solid var(--ui-border)',
              display: 'flex',
              justifyContent: 'space-around',
              fontSize: 11,
              color: 'var(--ui-text-muted)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                color: 'var(--ui-primary)',
                fontWeight: 600,
              }}
            >
              <span>🏠</span>
              <span>Home</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span>📅</span>
              <span>Schedule</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span>📋</span>
              <span>Roster</span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <span>⚙️</span>
              <span>Settings</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
