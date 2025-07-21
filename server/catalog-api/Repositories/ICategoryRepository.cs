using catalog_api.Models;

namespace catalog_api.Repositories;

public interface ICategoryRepository
{
    Task<List<Category>> GetAllAsync();
    Task<List<Product>> GetProductsByCategoryAsync(int categoryId);
}
