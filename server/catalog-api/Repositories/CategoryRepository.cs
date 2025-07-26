using catalog_api.Data;
using catalog_api.Models;
using Microsoft.EntityFrameworkCore;

namespace catalog_api.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly AppDbContext _context;

    public CategoryRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Category>> GetAllAsync()
    {
        return await _context.Categories.Include(c => c.Products).ToListAsync();
    }

    public async Task<List<Product>> GetProductsByCategoryAsync(int categoryId)
    {
        var category = await _context.Categories.Include(c => c.Products)
            .FirstOrDefaultAsync(c => c.Id == categoryId);

        return category?.Products.ToList() ?? new List<Product>();
    }
}
