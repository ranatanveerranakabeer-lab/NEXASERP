using ERPSoftifyApplication.DomainLayer.Entities;
using ERPSoftifyApplication.DomainLayer.Interface;
using ERPSoftifyApplicatione.ApplicationLayer.DTO.User;
using ERPSoftifyApplicatione.ApplicationLayer.Interface;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERPSoftifyApplicatione.ApplicationLayer.Services
{
    public class CompanySettingService:ICompanySettingService
    {
        private readonly ICompanySettingInterface _repository;

        public CompanySettingService(ICompanySettingInterface repository)
        {
            _repository = repository;
        }

        // ================== USER PROFILE ==================
        public async Task<UserProfileDto?> GetUserProfileAsync(int userId, CancellationToken cancellationToken)
        {
            var user = await _repository.GetUserProfileAsync(userId, cancellationToken);

            if (user == null)
                return null;

            return new UserProfileDto
            {
                Id = user.ID,
                Name = user.Name,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                EmployeeId = user.EmployeeId,
                WebsiteUrl = user.WebsiteUrl,
                ProfilePictureUrl = user.ProfilePictureUrl,
                CompanyId = user.CompanyId,
                RoleId = user.RoleId,
                TenantId = user.TenantId,
                BranchId = user.BranchId,
                IsActive = user.IsActive
            };
        }

        public async Task<UserProfileDto> SaveOrUpdateUserProfileAsync(UserProfileDto dto,IFormFile? profileImage, CancellationToken cancellationToken)
        {
            byte[]? imageBytes = null;
            string? fileName = null;

            if (profileImage != null)
            {
                using var ms = new MemoryStream();
                await profileImage.CopyToAsync(ms, cancellationToken);
                imageBytes = ms.ToArray();
                fileName = profileImage.FileName;
            }

            // 🔥 Convert DTO → Entity
            var entity = new User
            {
                ID = dto.Id,
                Name = dto.Name,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                EmployeeId = dto.EmployeeId,
                WebsiteUrl = dto.WebsiteUrl,
                CompanyId = dto.CompanyId,
                RoleId = dto.RoleId,
                TenantId = dto.TenantId,
                BranchId = dto.BranchId,
                IsActive = dto.IsActive
            };

            // Call repository (Entity only)
            var savedUser = await _repository
                .SaveOrUpdateUserProfileAsync(entity, imageBytes, fileName, cancellationToken);

            // 🔥 Convert Entity → DTO
            return new UserProfileDto
            {
                Id = savedUser.ID,
                Name = savedUser.Name,
                Email = savedUser.Email,
                PhoneNumber = savedUser.PhoneNumber,
                EmployeeId = savedUser.EmployeeId,
                WebsiteUrl = savedUser.WebsiteUrl,
                ProfilePictureUrl = savedUser.ProfilePictureUrl,
                CompanyId = savedUser.CompanyId,
                RoleId = savedUser.RoleId,
                TenantId = savedUser.TenantId,
                BranchId = savedUser.BranchId,
                IsActive = savedUser.IsActive
            };
        }

        // ================== COMPANY ==================
        public async Task<CompanySetting> GetCompanySettingAsync(int companyId, CancellationToken cancellationToken)
        {
            return await _repository.GetCompanySettingAsync(companyId, cancellationToken);
        }

        public async Task<CompanySetting> SaveOrUpdateCompanySettingAsync(CompanySetting company, CancellationToken cancellationToken)
        {
            return await _repository.SaveOrUpdateCompanySettingAsync(company, cancellationToken);
        }
    }
}
