using PatientAdministrationSystem.Application.Dto;
using PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Repositories.Interfaces;

namespace PatientAdministrationSystem.Application.Services;

public class PatientsService : IPatientsService
{
    private readonly IPatientsRepository _repository;

    public PatientsService(IPatientsRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<PatientSearchResult>> SearchPatientsAsync(string firstName, string lastName, string hospitalName)
    {
        return await _repository.SearchPatientsAsync(firstName, lastName, hospitalName);
    }
}