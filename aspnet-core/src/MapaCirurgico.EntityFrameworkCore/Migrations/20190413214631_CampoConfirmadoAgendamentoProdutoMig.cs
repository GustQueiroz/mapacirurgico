using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class CampoConfirmadoAgendamentoProdutoMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {           
            migrationBuilder.AddColumn<bool>(
                name: "Confirmado",
                table: "AgendamentoProduto",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {            

            migrationBuilder.DropColumn(
                name: "Confirmado",
                table: "AgendamentoProduto");
        }
    }
}
