using ERPSoftifyApplication.DomainLayer;
using ERPSoftifyApplication.DomainLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERPSoftifyApplicatione.ApplicationLayer.Interface
{
    public interface IMenuService
    {
        Task<ResponseDataModel<Menu>> CreateMenuAsync(Menu Menu, CancellationToken cancellationToken);

        Task<ResponseDataModel<List<Menu>>> GetAllMenusAsync(CancellationToken cancellationToken);

        Task<ResponseDataModel<Menu>> GetMenuByIdAsync(int id, CancellationToken cancellationToken);

        Task<ResponseDataModel<Menu>> UpdateMenuAsync(int id, Menu Menu, CancellationToken cancellationToken);

        Task<ResponseDataModel<bool>> DeleteMenuAsync(int id, CancellationToken cancellationToken);
    }
}
