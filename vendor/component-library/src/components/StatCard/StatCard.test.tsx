import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('renders title, value, and trend indicators', () => {
    render(
      <StatCard
        title="Attendance Rate"
        value="98.2%"
        description="Compared to past 7 days"
        trend={{ value: '+2.4%', direction: 'up' }}
      />
    );

    expect(screen.getByText('Attendance Rate')).toBeInTheDocument();
    expect(screen.getByText('98.2%')).toBeInTheDocument();
    expect(screen.getByText('↑ +2.4%')).toBeInTheDocument();
    expect(screen.getByText('Compared to past 7 days')).toBeInTheDocument();
  });
});
