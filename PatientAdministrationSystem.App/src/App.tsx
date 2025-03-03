import React, { useState } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import ResultsTable from './components/ResultsTable/ResultsTable';
import Alert from './components/Alert/Alert';
import { searchPatients } from './services/patientSearchService';
import './App.css';

const App: React.FC = () => {
  const [results, setResults] = useState<Array<{
    firstName: string;
    lastName: string;
    hospitalName: string;
    dateOfVisit: string;
  }>>([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleSearch = async (
    firstName: string,
    lastName: string,
    hospitalName: string
  ) => {
    try {
      const searchParams = { firstName, lastName, hospitalName };
      const data = await searchPatients(searchParams);
      setResults(data);
      setErrorMessage(null);
    } catch (error) {
      console.error('Search failed:', error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
      setResults([]);
    }
  };

  const closeAlert = () => {
    setErrorMessage(null);
  };

  return (
    <div className="app">
      <h1>HCI Patient Visit Search System</h1>
      <SearchForm onSearch={handleSearch} onError={setErrorMessage} />
      {errorMessage && (
        <Alert message={errorMessage} type="error" onClose={closeAlert} />
      )}
      <ResultsTable results={results} />
    </div>
  );
};

export default App;