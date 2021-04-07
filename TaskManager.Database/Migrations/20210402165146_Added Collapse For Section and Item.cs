using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskManager.Database.Migrations
{
    public partial class AddedCollapseForSectionandItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Collapsed",
                table: "Sections",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Collapsed",
                table: "Items",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Collapsed",
                table: "Sections");

            migrationBuilder.DropColumn(
                name: "Collapsed",
                table: "Items");
        }
    }
}
