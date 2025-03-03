using Moq;
using PatientAdministrationSystem.Infrastructure;
using PatientAdministrationSystem.Infrastructure.Repositories;

public class PatientsRepositoryTests
{
    private Mock<HciDataContext> _mockContext;
    private PatientsRepository _repository;

    public PatientsRepositoryTests()
    {
        _mockContext = new Mock<HciDataContext>();
        _repository = new PatientsRepository(_mockContext.Object);
    }

    [Fact]
    public async Task SearchPatientsAsync_ReturnsMatchingResults_WhenFirstNameMatches()
    {
    }

    [Fact]
    public async Task SearchPatientsAsync_ReturnsMatchingResults_WhenLastNameMatches()
    {
       
    }

    [Fact]
    public async Task SearchPatientsAsync_ReturnsMatchingResults_WhenHospitalNameMatches()
    {
    
    }

    [Fact]
    public async Task SearchPatientsAsync_ReturnsEmptyList_WhenNoMatchFound()
    {
      
    }
}
