using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class CreateListsAndListItems : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lists",
                columns: table =>
                    new
                    {
                        Id = table
                            .Column<int>(type: "INTEGER", nullable: false)
                            .Annotation("Sqlite:Autoincrement", true),
                        Name = table.Column<string>(type: "TEXT", nullable: false),
                        UserId = table.Column<string>(type: "TEXT", nullable: false)
                    },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lists_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade
                    );
                }
            );

            migrationBuilder.CreateTable(
                name: "ListItems",
                columns: table =>
                    new
                    {
                        Id = table
                            .Column<int>(type: "INTEGER", nullable: false)
                            .Annotation("Sqlite:Autoincrement", true),
                        TMDBId = table.Column<int>(type: "INTEGER", nullable: false),
                        ListId = table.Column<int>(type: "INTEGER", nullable: false)
                    },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ListItems_Lists_ListId",
                        column: x => x.ListId,
                        principalTable: "Lists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade
                    );
                }
            );

            migrationBuilder.CreateIndex(
                name: "IX_ListItems_ListId",
                table: "ListItems",
                column: "ListId"
            );

            migrationBuilder.CreateIndex(name: "IX_Lists_UserId", table: "Lists", column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(name: "ListItems");

            migrationBuilder.DropTable(name: "Lists");
        }
    }
}
