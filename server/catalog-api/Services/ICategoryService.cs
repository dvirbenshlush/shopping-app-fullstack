using catalog_api.Models;

namespace catalog_api.Services;

public interface ICategoryService
{
    Task<List<Category>> GetAllCategoriesAsync();
    Task<List<Product>> GetProductsByCategoryAsync(int categoryId);
}
