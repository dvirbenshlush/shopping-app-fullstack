using catalog_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace catalog_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _service;

    public CategoriesController(ICategoryService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categories = await _service.GetAllCategoriesAsync();
        return Ok(categories);
    }

    [HttpGet("{id}/products")]
    public async Task<IActionResult> GetProductsByCategory(int id)
    {
        var products = await _service.GetProductsByCategoryAsync(id);
        return Ok(products);
    }
}
