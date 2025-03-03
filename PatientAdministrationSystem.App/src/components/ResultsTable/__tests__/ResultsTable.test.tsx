import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import ResultsTable from '../ResultsTable';
import { Patient } from '../../../types/types';

describe('ResultsTable', () => {
  it('renders "No records found" when results array is empty', () => {
    const emptyResults: Patient[] = [];
    render(<ResultsTable results={emptyResults} />);
    expect(screen.getByText('No records found')).toBeInTheDocument();
  });

  it('renders a table with patient data when results array is not empty', () => {
    const mockResults: Patient[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        hospitalName: 'General Hospital',
        dateOfVisit: '2023-10-01',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        hospitalName: 'City Clinic',
        dateOfVisit: '2023-09-15',
      },
    ];
    render(<ResultsTable results={mockResults} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders the correct number of rows in the table', () => {
    const mockResults: Patient[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        hospitalName: 'General Hospital',
        dateOfVisit: '2023-10-01',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        hospitalName: 'City Clinic',
        dateOfVisit: '2023-09-15',
      },
    ];
    render(<ResultsTable results={mockResults} />);
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(mockResults.length + 1);
  });

  it('renders the correct patient data in the table', () => {
    const mockResults: Patient[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        hospitalName: 'General Hospital',
        dateOfVisit: '2023-10-01',
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        hospitalName: 'City Clinic',
        dateOfVisit: '2023-09-15',
      },
    ];
    render(<ResultsTable results={mockResults} />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('General Hospital')).toBeInTheDocument();
    expect(screen.getByText('2023-10-01')).toBeInTheDocument();

    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
    expect(screen.getByText('City Clinic')).toBeInTheDocument();
    expect(screen.getByText('2023-09-15')).toBeInTheDocument();
  });
});