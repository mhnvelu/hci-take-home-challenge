using Microsoft.EntityFrameworkCore;
using PatientAdministrationSystem.Application.Repositories.Interfaces;
using PatientAdministrationSystem.Application.Dto;


namespace PatientAdministrationSystem.Infrastructure.Repositories;

public class PatientsRepository : IPatientsRepository
{
    private readonly HciDataContext _context;

    public PatientsRepository(HciDataContext context)
    {
        _context = context;
    }

public async Task<IEnumerable<PatientSearchResult>> SearchPatientsAsync(string firstName, string lastName, string hospitalName)
    {
        var query = _context.PatientHospitalRelations
            .Include(phr => phr.Patient)
            .Include(phr => phr.Hospital)
            .Include(phr => phr.Visit)
            .AsQueryable();

        // Apply filters based on the provided parameters
        if (!string.IsNullOrEmpty(firstName))
        {
            query = query.Where(phr => phr.Patient.FirstName.Contains(firstName));
        }

        if (!string.IsNullOrEmpty(lastName))
        {
            query = query.Where(phr => phr.Patient.LastName.Contains(lastName));
        }

        if (!string.IsNullOrEmpty(hospitalName))
        {
            query = query.Where(phr => phr.Hospital.Name.Contains(hospitalName));
        }

        // Project the results into the desired format
        var results = await query
            .Select(phr => new PatientSearchResult
            {
                FirstName = phr.Patient.FirstName,
                LastName = phr.Patient.LastName,
                HospitalName = phr.Hospital.Name,
                DateOfVisit = phr.Visit.Date
            })
            .ToListAsync();

        return results;
    }
  
}