using ERPSoftifyApplication.DomainLayer.Entities;
using ERPSoftifyApplication.DomainLayer.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ERPSoftifyApplication.InfrastructureLayer.Repositories
{
    public class MenuRepository:IMenuInterface
    {
        private readonly DataContext _context;

        public MenuRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Menu> CreateAsync(Menu Menu, CancellationToken cancellationToken)
        {
            await _context.Menus.AddAsync(Menu, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return Menu;
        }

        public async Task<Menu?> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            return await _context.Menus
                .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        }

        public async Task<List<Menu>> GetAllAsync(CancellationToken cancellationToken)
        {
            return await _context.Menus
                .AsNoTracking()
                .ToListAsync(cancellationToken);
        }

        public async Task<Menu> UpdateAsync(Menu Menu, CancellationToken cancellationToken)
        {
            _context.Menus.Update(Menu);
            await _context.SaveChangesAsync(cancellationToken);

            return Menu;
        }

        public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken)
        {
            var entity = await _context.Menus
                .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

            if (entity == null)
                return false;

            _context.Menus.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}

