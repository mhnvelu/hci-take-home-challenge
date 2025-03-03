namespace PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Dto;

public interface IPatientsService
{
 Task<IEnumerable<PatientSearchResult>> SearchPatientsAsync(string firstName, string lastName, string hospitalName);
}