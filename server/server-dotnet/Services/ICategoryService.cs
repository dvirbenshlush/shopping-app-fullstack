using catalog_api.Models;

namespace catalog_api.Services;

public interface ICategoryService
{
    Task<StoreResponse<List<Category>>> GetAllCategoriesAsync();
    Task<StoreResponse<List<Product>>> GetProductsByCategoryAsync(int categoryId);
}
