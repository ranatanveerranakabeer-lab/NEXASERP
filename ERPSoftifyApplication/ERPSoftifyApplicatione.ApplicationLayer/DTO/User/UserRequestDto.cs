using Microsoft.AspNetCore.Http;

namespace ERPSoftifyApplicatione.ApplicationLayer.DTOs
{
    public class UserRequestDto
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Department { get; set; }
        public int EmployeeId { get; set; }
        public int CompanyId { get; set; }
        public string? WebsiteUrl { get; set; }

        public IFormFile? ProfileImage
        {
            get; set;
        }
}
}