using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class AgendamentoPacienteMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PacienteId",
                table: "Agendamentos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Agendamentos_PacienteId",
                table: "Agendamentos",
                column: "PacienteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Agendamentos_Pacientes_PacienteId",
                table: "Agendamentos",
                column: "PacienteId",
                principalTable: "Pacientes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Agendamentos_Pacientes_PacienteId",
                table: "Agendamentos");

            migrationBuilder.DropIndex(
                name: "IX_Agendamentos_PacienteId",
                table: "Agendamentos");

            migrationBuilder.DropColumn(
                name: "PacienteId",
                table: "Agendamentos");
        }
    }
}
