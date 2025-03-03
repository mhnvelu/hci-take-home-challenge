using Microsoft.AspNetCore.Mvc;
using PatientAdministrationSystem.Application.Interfaces;

namespace Hci.Ah.Home.Api.Gateway.Controllers.Patients;

[Route("api/patients")]
[ApiExplorerSettings(GroupName = "Patients")]
[ApiController]
public class PatientsController : ControllerBase
{
    private readonly IPatientsService _patientsService;

    public PatientsController(IPatientsService patientsService)
    {
        _patientsService = patientsService;
    }

 [HttpGet("search")]
public async Task<IActionResult> SearchPatients(
    [FromQuery] string? firstName, 
    [FromQuery] string? lastName, 
    [FromQuery] string? hospitalName)
{
    // Validate that either firstName or lastName is provided
    if (string.IsNullOrEmpty(firstName) && string.IsNullOrEmpty(lastName))
    {
        // return BadRequest("Either First Name or Last Name is required.");
        return ValidationProblem(
                detail: "Either First Name or Last Name is required.",
                statusCode: 400,
                title: "Bad Request"
            );
    }


    try
    {
        var results = await _patientsService.SearchPatientsAsync(firstName, lastName, hospitalName);
        return Ok(results);
    }
    catch (Exception ex)
    {
         return StatusCode(500, new ProblemDetails
            {
                Title = "Internal Server Error",
                Detail = "An error occurred while processing your request.",
                Status = 500
            });
    }
}
}