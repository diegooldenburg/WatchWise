using Microsoft.AspNetCore.Identity;

public class List
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string UserId { get; set; }
    public IdentityUser User { get; set; }
    public ICollection<ListItem> ListItems { get; set; }
}