using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
[Authorize]
public class ListController : ControllerBase
{
    private readonly AppUserContext _context;

    public ListController(AppUserContext context)
    {
        _context = context;
    }

    [HttpPost("create")]
    public async Task<ActionResult> CreateList(ListDto listDto)
    {
        var user = await _context.Users.FindAsync(listDto.UserId);
        if (user == null)
            return NotFound("User not found");

        var list = new List { Name = listDto.Name, User = user };

        _context.Lists.Add(list);
        await _context.SaveChangesAsync();

        return Ok(list);
    }

    [HttpDelete("delete/{id}")]
    public async Task<ActionResult> DeleteList(int id)
    {
        var list = await _context.Lists.FindAsync(id);
        if (list == null)
            return NotFound("List not found");

        _context.Lists.Remove(list);
        await _context.SaveChangesAsync();

        return Ok(list);
    }

    [HttpPost("add-item/{tmdbId}")]
    public async Task<ActionResult> AddItemToList(
        [FromBody] ListDto listDto,
        [FromRoute] int tmdbId
    )
    {
        var list = await _context.Lists.FindAsync(listDto.Id);
        if (list == null)
            return NotFound("List not found");

        var listItem = new ListItem { TMDBId = tmdbId, List = list };

        _context.ListItems.Add(listItem);
        await _context.SaveChangesAsync();

        return Ok(listItem);
    }

    [HttpDelete("remove-item/{id}")]
    public async Task<ActionResult> RemoveItemFromList(int id)
    {
        var listItem = await _context.ListItems.FindAsync(id);
        if (listItem == null)
            return NotFound("List item not found");

        _context.ListItems.Remove(listItem);
        await _context.SaveChangesAsync();

        return Ok(listItem);
    }

    [HttpPut("rename/{id}")]
    public async Task<ActionResult> RenameList(int id, ListDto listDto)
    {
        var list = await _context.Lists.FindAsync(id);
        if (list == null)
            return NotFound("List not found");

        list.Name = listDto.Name;
        await _context.SaveChangesAsync();

        return Ok(list);
    }

    [Authorize]
    [HttpGet("names")]
    public async Task<ActionResult<IEnumerable<string>>> GetListNames()
    {
        string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var listNames = await _context.Lists
            .Where(list => list.User.Id == userId)
            .Select(list => list.Name)
            .ToListAsync();

        return Ok(listNames);
    }
}
