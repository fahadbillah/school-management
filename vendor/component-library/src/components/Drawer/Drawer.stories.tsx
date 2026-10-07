import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { Avatar } from '../Avatar';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const RightSlideOver: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ padding: '24px' }}>
        <Button variant="primary" onClick={() => setOpen(true)}>
          View Student Detail Sheet
        </Button>

        <Drawer
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Student Dossier"
          placement="right"
          footer={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Dismiss
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Save Changes
              </Button>
            </>
          }
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Avatar name="Eleanor Vance" size="lg" status="online" />
              <div>
                <h4 style={{ margin: '0 0 4px 0' }}>Eleanor Vance</h4>
                <Badge variant="success" withDot>
                  Active Enrolled
                </Badge>
              </div>
            </div>
            <div>
              <p
                style={{
                  margin: '0 0 4px 0',
                  fontSize: '12px',
                  color: 'var(--ui-text-muted)',
                }}
              >
                Candidate ID
              </p>
              <p style={{ margin: 0, fontWeight: 600 }}>STU-2026-0042</p>
            </div>
            <div>
              <p
                style={{
                  margin: '0 0 4px 0',
                  fontSize: '12px',
                  color: 'var(--ui-text-muted)',
                }}
              >
                Academic Cohort
              </p>
              <p style={{ margin: 0 }}>
                Grade 11 • Honors Physics & Mathematics
              </p>
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
};
