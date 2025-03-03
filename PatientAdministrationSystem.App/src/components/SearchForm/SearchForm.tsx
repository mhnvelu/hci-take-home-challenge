// src/components/SearchForm.tsx
import React, { useState } from 'react';
import './SearchForm.css';

interface SearchFormProps {
  onSearch: (firstName: string, lastName: string, hospitalName: string) => void;
  onError: (message: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, onError }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hospitalName, setHospitalName] = useState('');

   // Function to check if the search button should be enabled
   const isSearchButtonDisabled = (): boolean => {
    return !firstName.trim() && !lastName.trim();
  };

  // Function to check if first name and last name are strings
  const validateInputs = (): boolean => {
  const nameRegex = /^[A-Za-z]+$/;
    if (
      (firstName && !nameRegex.test(firstName)) ||
      (lastName && !nameRegex.test(lastName))
    ) {
      onError('First Name, Last Name must contain only alphabetic characters (A-Z, a-z).');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    onSearch(firstName, lastName, hospitalName);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="hospitalName">Hospital Name (Optional)</label>
        <input
          type="text"
          id="hospitalName"
          value={hospitalName}
          onChange={(e) => setHospitalName(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="search-button"
        disabled={isSearchButtonDisabled()}
        title={isSearchButtonDisabled() ? 'First Name or Last Name is required' : ''}
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;