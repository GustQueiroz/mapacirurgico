using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class IdProcedimentoComoString : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Procedimentos",
                table: "Procedimentos");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "Procedimentos",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Procedimentos",
                table: "Procedimentos",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Procedimentos",
                table: "Procedimentos");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Procedimentos",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Procedimentos",
                table: "Procedimentos",
                column: "Codigo");
        }
    }
}
