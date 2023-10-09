using API.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly ITokenService _tokenService;
    private readonly IEmailService _emailService;

    public AccountController(
        UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager,
        ITokenService tokenService,
        IEmailService emailService
    )
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
        _emailService = emailService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Username))
            return BadRequest("Username is taken");

        var user = new IdentityUser
        {
            UserName = registerDto.Username.ToLower(),
            Email = registerDto.Email
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded)
            return BadRequest(result.Errors);

        var roleResult = await _userManager.AddToRoleAsync(user, "Member");

        if (!roleResult.Succeeded)
            return BadRequest(result.Errors);

        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        var confirmationLink = Url.Action(
            "ConfirmEmail",
            "Account",
            new { userId = user.Id, token = token },
            Request.Scheme
        );

        await _emailService.SendEmailAsync(
            registerDto.Email,
            "Confirm your email",
            $"Please confirm your account by <a href='{confirmationLink}'>clicking here</a>."
        );

        return new UserDto
        {
            Username = user.UserName,
            Token = await _tokenService.CreateToken(user),
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByNameAsync(loginDto.Username);
        if (user == null)
            return Unauthorized("Invalid username");

        var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
        if (!result)
            return Unauthorized();

        var token = await _tokenService.CreateToken(user);
        return Ok(new UserDto { Username = user.UserName, Token = token });
    }

    private async Task<bool> UserExists(string username)
    {
        return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
    }

    [HttpPost("token/create")]
    public async Task<ActionResult<string>> CreateToken(UserDto userDto)
    {
        var user = await _userManager.FindByNameAsync(userDto.Username);
        if (user == null)
            return Unauthorized("Invalid username");

        var token = await _tokenService.CreateToken(user);
        return Ok(new { accessToken = token });
    }

    [HttpPost("token/validate")]
    public async Task<ActionResult<bool>> ValidateToken([FromBody] TokenDto tokenDto)
    {
        var isValid = await _tokenService.ValidateToken(tokenDto.Token);
        return Ok(isValid);
    }
}
