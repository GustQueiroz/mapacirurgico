using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class AgendamentoTypeCampoAutorizacaoConvenioMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "AutorizacaoConvenio",
                table: "Agendamentos",
                maxLength: 256,
                nullable: false,
                oldClrType: typeof(string));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "AutorizacaoConvenio",
                table: "Agendamentos",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 256);
        }
    }
}
