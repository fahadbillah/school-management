import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup, Radio } from './Radio';

describe('Radio & RadioGroup', () => {
  it('renders radios within group and selects option', async () => {
    const handleChange = vi.fn();
    render(
      <RadioGroup
        name="role"
        label="Account Type"
        defaultValue="student"
        onChange={handleChange}
      >
        <Radio value="admin" label="Administrator" />
        <Radio value="student" label="Student" />
        <Radio value="faculty" label="Faculty Member" />
      </RadioGroup>
    );

    const studentRadio = screen.getByLabelText('Student');
    const facultyRadio = screen.getByLabelText('Faculty Member');

    expect(studentRadio).toBeChecked();
    expect(facultyRadio).not.toBeChecked();

    await userEvent.click(facultyRadio);
    expect(handleChange).toHaveBeenCalledWith('faculty');
    expect(facultyRadio).toBeChecked();
  });
});
