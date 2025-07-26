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

    public async Task<StoreResponse<List<Category>>> GetAllAsync()
    { 
        StoreResponse<List<Category>> storeResponse = new StoreResponse<List<Category>>();
        try {             
            var categories = await _context.Categories.Include(c => c.Products).ToListAsync();
            storeResponse.Data = categories;
            storeResponse.StatusCode = 200; // OK
        }
        catch (Exception ex)
        {
            storeResponse.ErrorMessage = ex.Message;
            storeResponse.StatusCode = 500; // Internal Server Error
        }

        return storeResponse;
    }

    public async Task<StoreResponse<List<Product>>> GetProductsByCategoryAsync(int categoryId)
    {
        StoreResponse<List<Product>> storeResponse = new StoreResponse<List<Product>>();

        try
        {
            var category = await _context.Categories.Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.Id == categoryId);
            storeResponse.Data = category?.Products.ToList() ?? new List<Product>();
            storeResponse.StatusCode = 200; // OK
        }
        catch (Exception ex)
        {
            storeResponse.ErrorMessage = ex.Message;
            storeResponse.StatusCode = 500; // Internal Server Error
        }

        return storeResponse;
    }
}
