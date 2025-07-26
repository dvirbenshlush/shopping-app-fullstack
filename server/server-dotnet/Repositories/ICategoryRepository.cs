using catalog_api.Models;

namespace catalog_api.Repositories;

public interface ICategoryRepository
{
    Task<StoreResponse<List<Category>>> GetAllAsync();
    Task<StoreResponse<List<Product>>> GetProductsByCategoryAsync(int categoryId);
}
