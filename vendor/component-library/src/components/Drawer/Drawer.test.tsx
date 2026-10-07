import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('does not render when isOpen is false', () => {
    render(
      <Drawer isOpen={false} onClose={() => {}}>
        Hidden
      </Drawer>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders title and content when open', () => {
    render(
      <Drawer isOpen={true} onClose={() => {}} title="Student Record">
        <p>Details panel</p>
      </Drawer>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Student Record')).toBeInTheDocument();
    expect(screen.getByText('Details panel')).toBeInTheDocument();
  });

  it('triggers onClose when close button clicked', async () => {
    const handleClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={handleClose} title="Drawer Title">
        Body
      </Drawer>
    );
    const closeBtn = screen.getByRole('button', { name: /close drawer/i });
    await userEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
