using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class RenameColumnCarteiraToCodigoClienteMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Carteira",
                table: "Pacientes",
                maxLength: 256,
                nullable: true);

            migrationBuilder.RenameColumn(
                name: "Carteira",
                table: "Pacientes",
                newName: "CodigoCliente");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
