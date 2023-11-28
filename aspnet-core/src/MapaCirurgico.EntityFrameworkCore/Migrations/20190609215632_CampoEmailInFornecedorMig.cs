using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class CampoEmailInFornecedorMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Fornecedor",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Fornecedor");
        }
    }
}
