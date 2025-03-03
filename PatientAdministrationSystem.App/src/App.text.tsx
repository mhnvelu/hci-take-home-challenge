import { render, screen } from '@testing-library/react';
import App from './App';

vi.mock('./services/patientSearchService');

describe('App Component', () => {
  
  it('renders the App component correctly', () => {
    render(<App />);
    expect(screen.getByText('HCI Patient Visit Search System')).toBeInTheDocument();
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('handles successful search and updates results', async () => {
  
  });

  it('handles search error and shows an alert', async () => {
   
  });

  it('closes the alert when the close button is clicked', async () => {
   
  });

  it('renders ResultsTable with empty data when search fails', async () => {
   
  });
});
