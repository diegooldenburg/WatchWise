public class ListItem
{
    public int Id { get; set; }
    public int TMDBId { get; set; }
    public int ListId { get; set; }
    public virtual List List { get; set; }
}
