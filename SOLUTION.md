# Health Care Informed Engineering - Solution

## Ask
A Health Care Informed customer needs to be able to_ find patient visit information at one of their hospitals. Create a simple web application using React, Typescript, C# that allows a customer to search patient/hospital visit information and display results. The application should have a very simple styled UX, some simple API’s and leverages the data store and sample data provided

## Overview
### UI
-   The React app provides search fields for First Name, Last Name, Hospital Name(Optional).
-   Either First Name or Last Name should be provided to perform the search. Hospital Name is optional field.
-   If Patient visit records are available and returned from .NET backend service, then UI renders the results in table. The table has columns First Name | Last Name | Hospital Name | Date of Visit
-   If Patient visit records are not available for the provided Patient, then 'No records found' is displayed.
-   If Hospital name is provided along with First Name or Last Name, then all the visits specific to that Hospital only displayed.

#### Validation 
-   If First or Last Name are not provided, then Search button is not enabled.
-   First Name, Last Name must be valid String. If its non-alphabetic, then an alert message shown on UI "First Name, Last Name must contain only alphabetic characters (A-Z, a-z)."

#### Error Handling
-   Any unexpected error like network error occurs during the search operation are handled gracefully and error message are shown on UI.

#### Trade offs, assumptions
-   To keep the design simple, the user needs to enter complete name. No partial name search.
-   No pagination supported on the results table.
-   Case sensitive search.

#### Test cases
-   Test cases for SearchForm component, ResultsTable has been written.
-   Outlined Test cases for patientSearchService.tsx, App.tsx.

#### Good to have features
-   Instead of typing the whole name(first or last), it would be useful for user of the application if we support type ahead/ auto complete feature for these fields and display the results in a drop down. 
-   Case insensitve search is needed.
-   The Results table should have pagination feature, which would allow user to request and navigate specified number of records per table.
-   The Results table can support filter option to further filter the returned visit records.
-   The Results table can support sort feature on Date of Visit column.

### .NET Backend Service
-   A REST api /api/patients/search accepts query params firstName, lastName, hospitalName
-   The api is simple to handle search operation. It can support new search parameter easily.
-   But if number of search parameters increases, this method needs to handle many conditional checks based on the business requirements.

#### Test cases
-   Unit tests for PatientController has been written.
-   Unit tests for Repository are outlined.

## How to run
### Clone the repo

This repository contains a React frontend and a .NET backend.

### Setup Instructions

#### Frontend (React)

1. Navigate to the `PatientAdminstrationSystem.App` folder:
   ```bash
   cd PatientAdminstrationSystem.App
2. Install dependencies
    ```bash
    npm install
3. Start the ui
    ```bash
   npm start
4. UI will run on http://localhost:5173

#### Backend (.NET)
1. Navigate to the `PatientAdministrationSystem.Api/PatientAdministrationSystem` folder:
   ```bash
   cd PatientAdministrationSystem.Api/PatientAdministrationSystem
2. Install dependencies
    ```bash
    dotnet restore
3. Start the backend service
    ```bash
   dotnet run
4. Backend service will run on http://localhost:5272

 