using ERPSoftifyApplication.DomainLayer;
using ERPSoftifyApplication.DomainLayer.Entities;
using ERPSoftifyApplication.DomainLayer.Interface;
using ERPSoftifyApplicatione.ApplicationLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERPSoftifyApplicatione.ApplicationLayer.Services
{
    public class MenuService:IMenuService
    {
        private readonly IMenuInterface _repoInterface;

        public MenuService(IMenuInterface repoInterface)
        {
            _repoInterface = repoInterface;
        }

        public async Task<ResponseDataModel<Menu>> CreateMenuAsync(
            Menu Menu,
            CancellationToken cancellationToken)
        {
            //Menu.CreatedAt = DateTime.UtcNow;

            var result = await _repoInterface.CreateAsync(Menu, cancellationToken);

            return ResponseDataModel<Menu>.SuccessResponse(result, "Menu created successfully");
        }

        public async Task<ResponseDataModel<List<Menu>>> GetAllMenusAsync(
            CancellationToken cancellationToken)
        {
            var result = await _repoInterface.GetAllAsync(cancellationToken);

            return ResponseDataModel<List<Menu>>.SuccessResponse(result);
        }

        public async Task<ResponseDataModel<Menu>> GetMenuByIdAsync(
            int id,
            CancellationToken cancellationToken)
        {
            var Menu = await _repoInterface.GetByIdAsync(id, cancellationToken);

            if (Menu == null)
                return ResponseDataModel<Menu>.FailureResponse("Menu not found");

            return ResponseDataModel<Menu>.SuccessResponse(Menu);
        }

        public async Task<ResponseDataModel<Menu>> UpdateMenuAsync(
            int id,
            Menu Menu,
            CancellationToken cancellationToken)
        {
            var existing = await _repoInterface.GetByIdAsync(id, cancellationToken);

            if (existing == null)
                return ResponseDataModel<Menu>.FailureResponse("Menu not found");

            existing.RoleMenus = Menu.RoleMenus;
            existing.Title = Menu.Title;
            existing.Url = Menu.Url;
            existing.Parent = Menu.Parent;
            existing.ParentId = Menu.ParentId;
            existing.Icon = Menu.Icon;
            existing.IsActive = Menu.IsActive;

            var updated = await _repoInterface.UpdateAsync(existing, cancellationToken);

            return ResponseDataModel<Menu>.SuccessResponse(updated, "Menu updated successfully");
        }

        public async Task<ResponseDataModel<bool>> DeleteMenuAsync(
            int id,
            CancellationToken cancellationToken)
        {
            var exists = await _repoInterface.GetByIdAsync(id, cancellationToken);

            if (exists == null)
                return ResponseDataModel<bool>.FailureResponse("Menu not found");

            var deleted = await _repoInterface.DeleteAsync(id, cancellationToken);

            return ResponseDataModel<bool>.SuccessResponse(deleted, "Menu deleted successfully");
        }

    }
}

