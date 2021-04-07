using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskManager.Database.Migrations
{
    public partial class AddedCollapseForProject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Collapsed",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Collapsed",
                table: "Projects");
        }
    }
}
