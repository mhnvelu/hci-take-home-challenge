using Microsoft.AspNetCore.Mvc;
using Moq;
using PatientAdministrationSystem.Application.Interfaces;
using PatientAdministrationSystem.Application.Entities;
using PatientAdministrationSystem.Application.Dto;
using Hci.Ah.Home.Api.Gateway.Controllers.Patients;
using FluentAssertions;

namespace PatientAdministrationSystem.Api.Tests.Controllers
{
    public class PatientsControllerTests
    {
        private readonly Mock<IPatientsService> _mockPatientsService;
        private readonly PatientsController _controller;

        public PatientsControllerTests()
        {
            _mockPatientsService = new Mock<IPatientsService>();
            _controller = new PatientsController(_mockPatientsService.Object);
        }

        [Fact]
        public async Task SearchPatients_ReturnsBadRequest_WhenFirstNameAndLastNameAreMissing()
        {
            string? firstName = null;
            string? lastName = null;
            string? hospitalName = "General Hospital";

            var result = await _controller.SearchPatients(firstName, lastName, hospitalName);

            result.Should().BeOfType<BadRequestObjectResult>();
            var badRequestResult = result as BadRequestObjectResult;
            badRequestResult.StatusCode.Should().Be(400);
            badRequestResult.Value.Should().BeOfType<ValidationProblemDetails>();
            var problemDetails = badRequestResult.Value as ValidationProblemDetails;
            problemDetails.Detail.Should().Be("Either First Name or Last Name is required.");
        }

        [Fact]
        public async Task SearchPatients_ReturnsOk_WhenValidParametersAreProvided()
        {
            string firstName = "John";
            string lastName = "Doe";
            string hospitalName = "General Hospital";

            var expectedResults = new List<PatientSearchResult>
            {
                new PatientSearchResult
                {
                    FirstName = "John",
                    LastName = "Doe",
                    HospitalName = "General Hospital",
                    DateOfVisit = DateTime.UtcNow
                }
            };

            _mockPatientsService
                .Setup(service => service.SearchPatientsAsync(firstName, lastName, hospitalName))
                .ReturnsAsync(expectedResults);

            var result = await _controller.SearchPatients(firstName, lastName, hospitalName);

            result.Should().BeOfType<OkObjectResult>();
            var okResult = result as OkObjectResult;
            okResult.Value.Should().BeEquivalentTo(expectedResults);
        }

        [Fact]
        public async Task SearchPatients_ReturnsInternalServerError_WhenExceptionIsThrown()
        {
            string firstName = "John";
            string lastName = "Doe";
            string hospitalName = "General Hospital";

            _mockPatientsService
                .Setup(service => service.SearchPatientsAsync(firstName, lastName, hospitalName))
                .ThrowsAsync(new Exception("Test exception"));

            var result = await _controller.SearchPatients(firstName, lastName, hospitalName);

            result.Should().BeOfType<ObjectResult>();
            var objectResult = result as ObjectResult;
            objectResult.StatusCode.Should().Be(500);
            objectResult.Value.Should().BeOfType<ProblemDetails>();
            var problemDetails = objectResult.Value as ProblemDetails;
            problemDetails.Detail.Should().Be("An error occurred while processing your request.");
        }
    }
}