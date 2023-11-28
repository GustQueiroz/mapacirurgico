using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class AgendamentoProcedimentoCampoObrigatorioMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AgendamentoProcedimento_Procedimentos_ProcedimentoId",
                table: "AgendamentoProcedimento");

            migrationBuilder.AlterColumn<string>(
                name: "ProcedimentoId",
                table: "AgendamentoProcedimento",
                maxLength: 10,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AgendamentoProcedimento_Procedimentos_ProcedimentoId",
                table: "AgendamentoProcedimento",
                column: "ProcedimentoId",
                principalTable: "Procedimentos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AgendamentoProcedimento_Procedimentos_ProcedimentoId",
                table: "AgendamentoProcedimento");

            migrationBuilder.AlterColumn<string>(
                name: "ProcedimentoId",
                table: "AgendamentoProcedimento",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 10);

            migrationBuilder.AddForeignKey(
                name: "FK_AgendamentoProcedimento_Procedimentos_ProcedimentoId",
                table: "AgendamentoProcedimento",
                column: "ProcedimentoId",
                principalTable: "Procedimentos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
