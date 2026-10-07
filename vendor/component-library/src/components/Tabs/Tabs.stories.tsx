import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabPanel, TabItem } from './Tabs';
import { Card, CardContent } from '../Card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '../Table';
import { Badge } from '../Badge';

const sampleTabs: TabItem[] = [
  { id: 'overview', label: 'Roster Overview', badge: '36' },
  { id: 'attendance', label: 'Attendance Roll Call' },
  { id: 'evaluations', label: 'Evaluation Matrix' },
  { id: 'archived', label: 'Prior Terms', disabled: true },
];

const manyTabs: TabItem[] = [
  { id: 'all', label: 'All Modules (24)' },
  { id: 'biology', label: 'Cell Biology 101', badge: 'Active' },
  { id: 'chemistry', label: 'Organic Chemistry Lab' },
  { id: 'physics', label: 'Quantum Mechanics II' },
  { id: 'calculus', label: 'Multivariable Calculus', badge: '3' },
  { id: 'literature', label: 'Modern World Literature' },
  { id: 'history', label: 'Contemporary European History' },
  { id: 'cs', label: 'Computer Systems & OS', badge: 'CRN' },
  { id: 'robotics', label: 'Robotics Mechatronics' },
  { id: 'ethics', label: 'Bioethics & Law' },
];

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['pill', 'underline', 'segmented'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: { control: 'boolean' },
    scrollable: { control: 'boolean' },
    showScrollButtons: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const SegmentedPill: Story = {
  render: () => {
    const [current, setCurrent] = useState('overview');

    return (
      <div style={{ maxWidth: '640px' }}>
        <Tabs
          tabs={sampleTabs}
          activeTab={current}
          onChange={setCurrent}
          variant="pill"
        />

        <TabPanel tabId="overview" activeTabId={current}>
          <Card elevation={1} style={{ marginTop: '16px' }}>
            <CardContent>
              <h4 style={{ margin: '0 0 8px 0' }}>Class Section 11-A</h4>
              <p style={{ margin: 0, color: 'var(--ui-text-muted)' }}>
                36 enrolled candidates. Regular timetable active.
              </p>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel tabId="attendance" activeTabId={current}>
          <div style={{ marginTop: '16px' }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead align="right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Eleanor Vance</TableCell>
                  <TableCell align="right">
                    <Badge variant="success" withDot>
                      Present
                    </Badge>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Marcus Sterling</TableCell>
                  <TableCell align="right">
                    <Badge variant="warning" withDot>
                      Late
                    </Badge>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabPanel>

        <TabPanel tabId="evaluations" activeTabId={current}>
          <Card elevation={1} style={{ marginTop: '16px' }}>
            <CardContent>
              <p style={{ margin: 0 }}>Mid-term marks are being processed.</p>
            </CardContent>
          </Card>
        </TabPanel>
      </div>
    );
  },
};

export const UnderlineVariant: Story = {
  render: () => {
    const [current, setCurrent] = useState('overview');

    return (
      <div style={{ maxWidth: '640px' }}>
        <Tabs
          tabs={sampleTabs}
          activeTab={current}
          onChange={setCurrent}
          variant="underline"
        />
        <div style={{ padding: '16px 0', color: 'var(--ui-text-muted)' }}>
          Active tab content for: <strong>{current}</strong>
        </div>
      </div>
    );
  },
};

export const SegmentedContainedVariant: Story = {
  render: () => {
    const [current, setCurrent] = useState('overview');

    return (
      <div style={{ maxWidth: '640px' }}>
        <Tabs
          tabs={sampleTabs}
          activeTab={current}
          onChange={setCurrent}
          variant="segmented"
        />
        <div style={{ padding: '16px 0', color: 'var(--ui-text-muted)' }}>
          Active tab content for: <strong>{current}</strong>
        </div>
      </div>
    );
  },
};

export const ScrollableNavigationPattern: Story = {
  render: () => {
    const [current, setCurrent] = useState('biology');

    return (
      <div style={{ maxWidth: '540px' }}>
        <p
          style={{
            fontSize: '12px',
            color: 'var(--ui-text-muted)',
            marginBottom: '12px',
          }}
        >
          Scrollable navigation container with responsive left/right chevron
          buttons and gradient edge masks:
        </p>

        <Tabs
          tabs={manyTabs}
          activeTab={current}
          onChange={setCurrent}
          variant="pill"
          scrollable
          showScrollButtons
        />

        <div
          style={{
            marginTop: '16px',
            padding: '16px',
            background: 'var(--ui-surface-container-low)',
            borderRadius: '8px',
            border: '1px solid var(--ui-border)',
          }}
        >
          Selected Subject Module: <strong>{current}</strong>
        </div>
      </div>
    );
  },
};

export const MoreDropdownOverflow: Story = {
  render: () => {
    const [current, setCurrent] = useState('overview');

    return (
      <div style={{ maxWidth: '640px' }}>
        <p
          style={{
            fontSize: '12px',
            color: 'var(--ui-text-muted)',
            marginBottom: '12px',
          }}
        >
          Tabs with `maxVisibleTabs={2}` showing 2 visible tabs and a nested
          &quot;More&quot; dropdown button directly inside the tab nav bar:
        </p>
        <Tabs
          tabs={manyTabs}
          activeTab={current}
          onChange={setCurrent}
          variant="pill"
          maxVisibleTabs={2}
          moreLabel="More"
        />

        <div
          style={{
            marginTop: '16px',
            padding: '16px',
            background: 'var(--ui-surface-container-low)',
            borderRadius: '8px',
            border: '1px solid var(--ui-border)',
          }}
        >
          Active Tab selection: <strong>{current}</strong>
        </div>
      </div>
    );
  },
};

export const MoreDropdownUnderline: Story = {
  render: () => {
    const [current, setCurrent] = useState('physics');

    return (
      <div style={{ maxWidth: '600px' }}>
        <Tabs
          tabs={manyTabs}
          activeTab={current}
          onChange={setCurrent}
          variant="underline"
          maxVisibleTabs={3}
          moreLabel="More Subjects"
        />

        <div style={{ padding: '16px 0', color: 'var(--ui-text-muted)' }}>
          Active Tab selection: <strong>{current}</strong>
        </div>
      </div>
    );
  },
};
