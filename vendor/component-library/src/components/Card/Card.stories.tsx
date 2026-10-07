import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';
import { Button } from '../Button';
import { Badge } from '../Badge';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: 'select',
      options: [1, 2, 3],
    },
    isInteractive: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const DefaultElevation1: Story = {
  render: () => (
    <Card elevation={1} style={{ maxWidth: '420px' }}>
      <CardHeader>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <CardTitle>Period 1 - Physics II</CardTitle>
          <Badge variant="success" withDot>
            In Session
          </Badge>
        </div>
        <CardDescription>Room 304 • Prof. Alistair Vance</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0, fontSize: '14px', color: '#414750' }}>
          34 of 36 students verified present. Lab assignment due in 45 minutes.
        </p>
      </CardContent>
      <CardFooter bordered>
        <Button variant="outline" size="sm">
          View Class List
        </Button>
        <Button variant="primary" size="sm">
          Take Attendance
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const FloatingElevation2: Story = {
  render: () => (
    <Card elevation={2} isInteractive style={{ maxWidth: '420px' }}>
      <CardHeader>
        <CardTitle>Quarterly Marks Matrix</CardTitle>
        <CardDescription>
          Hover over this interactive elevated card.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <Badge variant="info">Average: 88.4%</Badge>
          <Badge variant="success">+4.2% vs last term</Badge>
        </div>
      </CardContent>
    </Card>
  ),
};

export const HighNoticeElevation3: Story = {
  render: () => (
    <Card elevation={3} style={{ maxWidth: '420px' }}>
      <CardHeader bordered>
        <CardTitle>Compliance Audit Notice</CardTitle>
        <CardDescription>
          High elevation modal / elevated sheet container
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ margin: 0, fontSize: '14px', color: '#0F172A' }}>
          Accreditation verification is pending submission by October 15.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="primary" fullWidth size="md">
          Open Audit Portal
        </Button>
      </CardFooter>
    </Card>
  ),
};
