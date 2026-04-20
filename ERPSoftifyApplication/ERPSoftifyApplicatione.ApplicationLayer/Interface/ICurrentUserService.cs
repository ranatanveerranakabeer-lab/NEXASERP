using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERPSoftifyApplicatione.ApplicationLayer.Interface
{
    public interface ICurrentUserService
    {
        int UserId { get; }
        int TenantId { get; }
        int BranchId { get; }
        int CompanyId { get; }
        bool IsAuthenticated { get; }
    }
}
