import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';

describe('Card', () => {
  it('renders card and subcomponents correctly', () => {
    render(
      <Card elevation={2}>
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
          <CardDescription>Daily summary of enrolled students.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Total Present: 98%</p>
        </CardContent>
        <CardFooter>
          <button>View Details</button>
        </CardFooter>
      </Card>
    );

    expect(
      screen.getByRole('heading', { name: /attendance overview/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Daily summary of enrolled students.')
    ).toBeInTheDocument();
    expect(screen.getByText('Total Present: 98%')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /view details/i })
    ).toBeInTheDocument();
  });
});
