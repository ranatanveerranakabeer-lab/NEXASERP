using ERPSoftifyApplication.DomainLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERPSoftifyApplication.InfrastructureLayer
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<StockTransaction> StockTransactions { get; set; }
        public DbSet<Quotation> Quotations { get; set; }
        public DbSet<QuotationItem> QuotationItems { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<RoleMenu> RoleMenus { get; set; }
        public DbSet<RolePermission> RolePermission { get; set; }
        public DbSet<Leave> Leaves { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Lead> Leads { get; set; }
        public DbSet<PurchaseOrder> PurchaseOrders { get; set; }
        public DbSet<PurchaseOrderItem> PurchaseOrderItems { get; set; }
        public DbSet<JobAssignment> JobAssignments { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Invoice> invoice { get; set; }
        public DbSet<InvoiceItems> invoiceitems { get; set; }
        public DbSet<FollowUp> FollowUps { get; set; }
        public DbSet<GoodsReceived> GoodsReceiveds { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Attendance> Attendances { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }
        public DbSet<SalesOrder> SalesOrders { get; set; }
        public DbSet<ServiceReport> ServiceReports { get; set; }
        public DbSet<TenantSetting> TenantSettings { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<CompanySetting> CompanySettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<RoleMenu>()
            .HasKey(rm => new { rm.RoleId, rm.MenuId });

            modelBuilder.Entity<RoleMenu>()
                .HasOne(rm => rm.Menu)
                .WithMany(m => m.RoleMenus)
                .HasForeignKey(rm => rm.MenuId);
        }

    }
}
