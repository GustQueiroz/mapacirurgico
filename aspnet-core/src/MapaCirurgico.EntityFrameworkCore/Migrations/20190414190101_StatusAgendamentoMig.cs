using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class StatusAgendamentoMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {           

            migrationBuilder.AddColumn<int>(
                name: "StatusAgendamento",
                table: "Agendamentos",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StatusAgendamento",
                table: "Agendamentos");
                      
        }
    }
}
