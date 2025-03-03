import { describe, test, expect , vi} from 'vitest';
import { searchPatients } from '../patientSearchService';
import apiClient from '../../api/apiClient';
import { Patient, SearchParams } from '../../types/types';

// Mock the apiClient
vi.mock('../../api/apiClient', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('searchPatients', () => {
  test('should return patient data when the API call is successful', async () => {
    // Mock the API response
    const mockPatients: Patient[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        hospitalName: 'General Hospital',
        dateOfVisit: '2023-10-01',
      },
    ];

    // Mock the get method of apiClient
    (apiClient.get as vi.Mock).mockResolvedValueOnce({ data: mockPatients });

    // Call the function
    const params: SearchParams = { firstName: 'John', lastName: 'Doe' };
    const result = await searchPatients(params);

    // Assertions
    expect(apiClient.get).toHaveBeenCalledWith('/patients/search', { params });
    expect(result).toEqual(mockPatients);
  });

  test('should throw an error when the API call fails', async () => {
    const mockError = new Error('Failed to fetch data');
    (apiClient.get as vi.Mock).mockRejectedValueOnce(mockError);

    const params: SearchParams = { firstName: 'John', lastName: 'Doe' };

    
    await expect(searchPatients(params)).rejects.toThrow('Failed to fetch data');
    expect(apiClient.get).toHaveBeenCalledWith('/patients/search', { params });
  });

  test('should include hospitalName in params if provided', async () => {
    const mockPatients: Patient[] = [
      {
        firstName: 'John',
        lastName: 'Doe',
        hospitalName: 'General Hospital',
        dateOfVisit: '2023-10-01',
      },
    ];

    (apiClient.get as vi.Mock).mockResolvedValueOnce({ data: mockPatients });

    const params: SearchParams = { firstName: 'John', lastName: 'Doe', hospitalName: 'General Hospital' };
    const result = await searchPatients(params);

    expect(apiClient.get).toHaveBeenCalledWith('/patients/search', { params });
    expect(result).toEqual(mockPatients);
  });
});