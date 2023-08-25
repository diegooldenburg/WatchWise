using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class AppUserContext : IdentityDbContext
{
    public AppUserContext(DbContextOptions<AppUserContext> options)
        : base(options)
    {
    }
}