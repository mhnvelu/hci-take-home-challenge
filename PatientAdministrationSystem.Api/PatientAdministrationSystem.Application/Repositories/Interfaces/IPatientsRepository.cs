using PatientAdministrationSystem.Application.Dto;


namespace PatientAdministrationSystem.Application.Repositories.Interfaces;

public interface IPatientsRepository
{
    Task<IEnumerable<PatientSearchResult>> SearchPatientsAsync(string firstName, string lastName, string hospitalName);
}