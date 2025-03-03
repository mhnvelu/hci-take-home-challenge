export interface Patient {
    firstName: string;
    lastName: string;
    hospitalName: string;
    dateOfVisit: string;
  }
  
export interface SearchParams {
    firstName: string;
    lastName: string;
    hospitalName?: string;
  }