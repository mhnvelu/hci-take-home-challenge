import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchForm from '../SearchForm';

describe('SearchForm', () => {
  const mockOnSearch = vi.fn();
  const mockOnError = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
    mockOnError.mockClear();
  });

  it('should disable the search button when both firstName and lastName are empty', () => {
    render(<SearchForm onSearch={mockOnSearch} onError={mockOnError} />);

    const searchButton = screen.getByRole('button', { name: "Search" });
    expect(searchButton).toBeDisabled();
  });

  it('should enable the search button when either firstName or lastName is non-empty', () => {
    render(<SearchForm onSearch={mockOnSearch} onError={mockOnError} />);

    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: 'John' } });

    const searchButton = screen.getByRole('button', { name: "Search" });
    expect(searchButton).not.toBeDisabled();
  });

  it('should call onError when firstName contains non-alphabetic characters', () => {
    render(<SearchForm onSearch={mockOnSearch} onError={mockOnError} />);

    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: 'John123' } });

    const searchButton = screen.getByRole('button', { name: "Search" });
    fireEvent.click(searchButton);

    expect(mockOnError).toHaveBeenCalledWith(
      'First Name, Last Name must contain only alphabetic characters (A-Z, a-z).'
    );
  });

  it('should call onError when lastName contains non-alphabetic characters', () => {
    render(<SearchForm onSearch={mockOnSearch} onError={mockOnError} />);

    const lastNameInput = screen.getByLabelText("Last Name");
    fireEvent.change(lastNameInput, { target: { value: 'Doe123' } });

    const searchButton = screen.getByRole('button', { name: "Search" });
    fireEvent.click(searchButton);

    expect(mockOnError).toHaveBeenCalledWith(
      'First Name, Last Name must contain only alphabetic characters (A-Z, a-z).'
    );
  });

  it('should call onError when hospitalName contains non-alphabetic characters', () => {
    render(<SearchForm onSearch={mockOnSearch} onError={mockOnError} />);

    const lastNameInput = screen.getByLabelText("Last Name");
    fireEvent.change(lastNameInput, { target: { value: 'Doe123' } });

    const hospitalNameInput = screen.getByLabelText("Hospital Name (Optional)");
    fireEvent.change(hospitalNameInput, { target: { value: 'Hospital123' } });

    const searchButton = screen.getByRole('button', { name: "Search" });
    fireEvent.click(searchButton);

    expect(mockOnError).toHaveBeenCalledWith(
      'First Name, Last Name must contain only alphabetic characters (A-Z, a-z).'
    );
  });

  it('should call onSearch with the correct values when the form is submitted with valid inputs', () => {
    render(<SearchForm onSearch={mockOnSearch} onError={mockOnError} />);

    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: 'John' } });

    const lastNameInput = screen.getByLabelText("Last Name");
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });

    const hospitalNameInput = screen.getByLabelText("Hospital Name (Optional)");
    fireEvent.change(hospitalNameInput, { target: { value: 'General Hospital' } });

    const searchButton = screen.getByRole('button', { name: "Search" });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('John', 'Doe', 'General Hospital');    
  });

  it('should not call onSearch when the form is submitted with invalid inputs', () => {
    render(<SearchForm onSearch={mockOnSearch} onError={mockOnError} />);

    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: 'John123' } });

    const searchButton = screen.getByRole('button', { name: "Search" });
    fireEvent.click(searchButton);

    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});