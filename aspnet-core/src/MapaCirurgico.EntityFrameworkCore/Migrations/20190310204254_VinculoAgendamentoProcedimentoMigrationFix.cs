using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class VinculoAgendamentoProcedimentoMigrationFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AgendamentoProcedimento_Procedimentos_ProcedimentoId1",
                table: "AgendamentoProcedimento");

            migrationBuilder.DropIndex(
                name: "IX_AgendamentoProcedimento_ProcedimentoId1",
                table: "AgendamentoProcedimento");

            migrationBuilder.DropColumn(
                name: "ProcedimentoId1",
                table: "AgendamentoProcedimento");

            migrationBuilder.AlterColumn<string>(
                name: "ProcedimentoId",
                table: "AgendamentoProcedimento",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_AgendamentoProcedimento_ProcedimentoId",
                table: "AgendamentoProcedimento",
                column: "ProcedimentoId");

            migrationBuilder.AddForeignKey(
                name: "FK_AgendamentoProcedimento_Procedimentos_ProcedimentoId",
                table: "AgendamentoProcedimento",
                column: "ProcedimentoId",
                principalTable: "Procedimentos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AgendamentoProcedimento_Procedimentos_ProcedimentoId",
                table: "AgendamentoProcedimento");

            migrationBuilder.DropIndex(
                name: "IX_AgendamentoProcedimento_ProcedimentoId",
                table: "AgendamentoProcedimento");

            migrationBuilder.AlterColumn<int>(
                name: "ProcedimentoId",
                table: "AgendamentoProcedimento",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProcedimentoId1",
                table: "AgendamentoProcedimento",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_AgendamentoProcedimento_ProcedimentoId1",
                table: "AgendamentoProcedimento",
                column: "ProcedimentoId1");

            migrationBuilder.AddForeignKey(
                name: "FK_AgendamentoProcedimento_Procedimentos_ProcedimentoId1",
                table: "AgendamentoProcedimento",
                column: "ProcedimentoId1",
                principalTable: "Procedimentos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
