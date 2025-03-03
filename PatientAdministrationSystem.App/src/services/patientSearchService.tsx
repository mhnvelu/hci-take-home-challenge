import apiClient from '../api/apiClient';
import { Patient, SearchParams } from '../types/types';

export const searchPatients = async (
  params: SearchParams
): Promise<Patient[]> => {
  try {
    const response = await apiClient.get('/patients/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching patient data:', error);
    throw error;
  }
};