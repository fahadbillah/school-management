import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalFooter } from './Modal';
import { Button } from '../Button';
import { Input } from '../Input';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const InteractiveDemo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: '24px' }}>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          Trigger Enrollment Modal
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Student Course Enrollment"
          size="md"
          footer={
            <ModalFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Confirm & Enroll
              </Button>
            </ModalFooter>
          }
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <p style={{ margin: 0, color: 'var(--ui-text-muted)' }}>
              Confirm course roster additions for the upcoming academic
              semester.
            </p>
            <Input label="Student Name" defaultValue="Aria Thorne" disabled />
            <Input label="Assigned Advisor" defaultValue="Dr. Robert Hayes" />
          </div>
        </Modal>
      </div>
    );
  },
};
