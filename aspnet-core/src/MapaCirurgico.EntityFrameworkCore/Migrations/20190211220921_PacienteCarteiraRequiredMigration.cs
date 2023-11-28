using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class PacienteCarteiraRequiredMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Carteira",
                table: "Pacientes",
                maxLength: 17,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 17,
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Carteira",
                table: "Pacientes",
                maxLength: 17,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 17);
        }
    }
}
