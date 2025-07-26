namespace catalog_api.Models;

public class StoreResponse<T>
{
    public T? Data { get; set; }
    public string? ErrorMessage { get; set; }
    public int StatusCode { get; set; }
}