import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './Table';
import { Badge } from '../Badge';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

const mockStudents = [
  {
    id: 'STU-1021',
    name: 'Eleanor Vance',
    class: 'Grade 11-A',
    score: '96.2%',
    status: 'success',
    label: 'Present',
  },
  {
    id: 'STU-1022',
    name: 'Marcus Sterling',
    class: 'Grade 11-A',
    score: '88.5%',
    status: 'warning',
    label: 'Late (10m)',
  },
  {
    id: 'STU-1023',
    name: 'Sophia Chen',
    class: 'Grade 11-A',
    score: '91.0%',
    status: 'success',
    label: 'Present',
  },
  {
    id: 'STU-1024',
    name: 'Liam Gallagher',
    class: 'Grade 11-A',
    score: '74.2%',
    status: 'danger',
    label: 'Absent',
  },
  {
    id: 'STU-1025',
    name: 'Aria Thorne',
    class: 'Grade 11-A',
    score: '94.8%',
    status: 'info',
    label: 'Excused',
  },
];

export const StudentRoster: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow isHoverable={false}>
          <TableHead>Student ID</TableHead>
          <TableHead>Full Name</TableHead>
          <TableHead>Section</TableHead>
          <TableHead align="right">Cumulative Mark</TableHead>
          <TableHead align="center">Roll Call Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockStudents.map((s) => (
          <TableRow key={s.id}>
            <TableCell
              style={{ fontWeight: 600, color: 'var(--ui-primary-accent)' }}
            >
              {s.id}
            </TableCell>
            <TableCell style={{ fontWeight: 500 }}>{s.name}</TableCell>
            <TableCell style={{ color: 'var(--ui-text-muted)' }}>
              {s.class}
            </TableCell>
            <TableCell align="right" isNumeric style={{ fontWeight: 600 }}>
              {s.score}
            </TableCell>
            <TableCell align="center">
              <Badge variant={s.status as any} withDot>
                {s.label}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
