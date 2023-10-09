public class ListDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string UserId { get; set; }
    public ICollection<ListItemDto> ListItems { get; set; }
}
