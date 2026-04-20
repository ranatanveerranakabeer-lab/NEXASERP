using ERPSoftifyApplication.DomainLayer.Entities;
using ERPSoftifyApplication.DomainLayer.Interface;
using Microsoft.EntityFrameworkCore;

namespace ERPSoftifyApplication.InfrastructureLayer.Repositories
{
    public class UserRepository : IUserInterface
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        // ✅ CREATE USER (Tenant required)
        public async Task<User> CreateAsync(User user, CancellationToken cancellationToken)
        {
            // 🔥 Tenant must be selected
            if (user.TenantId <= 0)
                throw new Exception("Tenant is required");

            await _context.Users.AddAsync(user, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            return user;
        }

        // ✅ GET BY ID (Tenant Filter)
        public async Task<User?> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            return await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.ID == id, cancellationToken);
            // 🔥 NOTE: Tenant filter service layer me lagana better hai
        }

        // ✅ GET ALL USERS (Tenant Based)
        public async Task<List<User>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _context.Users
                .AsNoTracking()
                .Include(x => x.Role)
                .Include(x => x.Company)
                .Include(x => x.Tenant)
                .Include(x => x.Branch)
                .ToListAsync(cancellationToken);
        }

        // ✅ GET USERS BY TENANT 🔥🔥🔥 (IMPORTANT)
        public async Task<List<User>> GetByTenantAsync(int tenantId, CancellationToken cancellationToken)
        {
            return await _context.Users
                .AsNoTracking()
                .Where(x => x.TenantId == tenantId)
                .ToListAsync(cancellationToken);
        }

        // ✅ UPDATE USER (Tenant Safe)
        public async Task<User> UpdateAsync(User user, CancellationToken cancellationToken)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(x => x.ID == user.ID, cancellationToken);

            if (existingUser == null)
                throw new Exception("User not found");

            // 🔥 Tenant change not allowed (important security rule)
            if (existingUser.TenantId != user.TenantId)
                throw new Exception("Tenant change not allowed");

            _context.Entry(existingUser).CurrentValues.SetValues(user);

            await _context.SaveChangesAsync(cancellationToken);
            return existingUser;
        }

        // ✅ DELETE USER
        public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.ID == id, cancellationToken);

            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }

        // ✅ GET BY EMAIL + TENANT 🔥 (VERY IMPORTANT)
        public async Task<User?> GetByEmailAsync(string email, int tenantId, CancellationToken cancellationToken)
        {
            return await _context.Users
                .FirstOrDefaultAsync(x => x.Email == email && x.TenantId == tenantId, cancellationToken);
        }

        // ✅ LOGIN METHOD 🔥
        public async Task<User?> GetByLoginAsync(string email, int tenantId, CancellationToken cancellationToken)
        {
            return await _context.Users
                .FirstOrDefaultAsync(x => x.Email == email && x.TenantId == tenantId, cancellationToken);
        }

        // ❌ OLD METHOD REMOVE KAR DO (confusion create karta hai)
        public async Task<User?> GetByUserNameAsync(string email, CancellationToken cancellationToken)
        {
            return await _context.Users
                .FirstOrDefaultAsync(x => x.Email == email, cancellationToken);
        }

        // ✅ USER EXISTS (Tenant Wise)
        public async Task<bool> UserExistsAsync(string email, string username, int tenantId, CancellationToken cancellationToken)
        {
            return await _context.Users
                .AnyAsync(x => (x.Email == email || x.Name == username) && x.TenantId == tenantId, cancellationToken);
        }

        // ✅ UPDATE PASSWORD
        public async Task<bool> UpdatePasswordAsync(int userId, string passwordHash, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.ID == userId, cancellationToken);

            if (user == null) return false;

            user.PasswordHash = passwordHash;
            user.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }

        // ✅ ACTIVATE USER
        public async Task<bool> ActivateUserAsync(int userId, bool isActive, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.ID == userId, cancellationToken);

            if (user == null) return false;

            user.IsActive = isActive;
            user.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }

        // ✅ COMPANY EXISTS
        public async Task<bool> CompanyExistsAsync(int companyId, CancellationToken cancellationToken)
        {
            return await _context.CompanySettings
                .AsNoTracking()
                .AnyAsync(c => c.Id == companyId, cancellationToken);
        }

        // ✅ BRANCH EXISTS
        public async Task<bool> BranchExistsAsync(int branchId, CancellationToken cancellationToken)
        {
            return await _context.Branches
                .AsNoTracking()
                .AnyAsync(b => b.Id == branchId, cancellationToken);
        }
    }
}