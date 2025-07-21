using catalog_api.Models;
using catalog_api.Repositories;

namespace catalog_api.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _repo;

    public CategoryService(ICategoryRepository repo)
    {
        _repo = repo;
    }

    public async Task<List<Category>> GetAllCategoriesAsync()
    {
        return await _repo.GetAllAsync();
    }

    public async Task<List<Product>> GetProductsByCategoryAsync(int categoryId)
    {
        return await _repo.GetProductsByCategoryAsync(categoryId);
    }
}
