namespace PatientAdministrationSystem.Application.Dto
{
    public class PatientSearchResult
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string HospitalName { get; set; }
        public DateTime DateOfVisit { get; set; }
    }
}