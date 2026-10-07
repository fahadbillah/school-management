import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('renders search input with shortcut hint and placeholder', () => {
    render(<SearchInput placeholder="Quick search..." shortcutHint="⌘K" />);
    expect(screen.getByPlaceholderText('Quick search...')).toBeInTheDocument();
    expect(screen.getByText('⌘K')).toBeInTheDocument();
  });

  it('clears query when clear button is clicked', async () => {
    const handleClear = vi.fn();
    render(<SearchInput defaultValue="Eleanor" onClear={handleClear} />);
    const clearButton = screen.getByRole('button', { name: /clear search/i });
    expect(clearButton).toBeInTheDocument();

    await userEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('searchbox')).toHaveValue('');
  });
});
