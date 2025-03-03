import React from 'react';
import './ResultsTable.css';
import { Patient } from '../../types/types';

interface ResultsTableProps {
  results: Patient[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ results }) => {
  if (results.length === 0) {
    return <div className="no-results">No records found</div>;
  }

  return (
    <table className="results-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Hospital Name</th>
          <th>Date of Visit</th>
        </tr>
      </thead>
      <tbody>
        {results.map((patient, index) => (
          <tr key={index}>
            <td>{patient.firstName}</td>
            <td>{patient.lastName}</td>
            <td>{patient.hospitalName}</td>
            <td>{patient.dateOfVisit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResultsTable;