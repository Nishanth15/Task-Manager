using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskManager.Database.Migrations
{
    public partial class UpdatedProjectUserLookup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LK_Project_User_Users_ProjectId",
                table: "LK_Project_User");

            migrationBuilder.AddForeignKey(
                name: "FK_LK_Project_User_Projects_ProjectId",
                table: "LK_Project_User",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LK_Project_User_Projects_ProjectId",
                table: "LK_Project_User");

            migrationBuilder.AddForeignKey(
                name: "FK_LK_Project_User_Users_ProjectId",
                table: "LK_Project_User",
                column: "ProjectId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
