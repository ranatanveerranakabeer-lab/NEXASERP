using ERPSoftifyApplication.DomainLayer.Entities;
using ERPSoftifyApplicatione.ApplicationLayer.DTO.User;
using ERPSoftifyApplicatione.ApplicationLayer.DTOs;
using ERPSoftifyApplicatione.ApplicationLayer.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ERPSoftifyApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanySettingController : ControllerBase
    {
        private readonly ICompanySettingService _settingService;

        public CompanySettingController(ICompanySettingService settingService)
        {
            _settingService = settingService;
        }

        [HttpGet("profile/{userId:int}")] 
        public async Task<IActionResult> GetProfile(int userId, CancellationToken cancellationToken)
        {
            if (userId <= 0)
                return BadRequest("Invalid User ID");

            var user = await _settingService.GetUserProfileAsync(userId, cancellationToken);
            if (user == null)
                return NotFound("User not found");

            var dto = new UserProfileDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                Department = user.Department,
                EmployeeId = user.EmployeeId,
                WebsiteUrl = user.WebsiteUrl,
                ProfilePictureUrl = user.ProfilePictureUrl,
                CompanyId = user.CompanyId
            };

            return Ok(dto);
        }

        [HttpPost("profile")]
        public async Task<IActionResult> SaveOrUpdateProfile( [FromForm] UserRequestDto request, CancellationToken cancellationToken)
        {
            var user = new UserProfileDto
            {
                Id = request.ID,
                Name = request.Name,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email,
                Department = request.Department,
                EmployeeId = request.EmployeeId,
                CompanyId = request.CompanyId,
                WebsiteUrl = request.WebsiteUrl,
                
            };

            var result = await _settingService
                .SaveOrUpdateUserProfileAsync(user, request.ProfileImage, cancellationToken);

            return Ok(result);
        }

        [HttpGet("company/{companyId}")]
        public async Task<IActionResult> GetCompany(int companyId, CancellationToken cancellationToken)
        {
            if (companyId <= 0)
                return BadRequest("Invalid Company ID");

            var company = await _settingService.GetCompanySettingAsync(companyId, cancellationToken);
            return Ok(company);
        }

        [HttpPost("company")]
        public async Task<IActionResult> SaveOrUpdateCompany(  [FromBody] CompanySetting company, CancellationToken cancellationToken)
        {
            if (company == null)
                return BadRequest("Invalid company data");

            var updatedCompany = await _settingService.SaveOrUpdateCompanySettingAsync(company, cancellationToken);
            return Ok(updatedCompany);
        }
    }
}
