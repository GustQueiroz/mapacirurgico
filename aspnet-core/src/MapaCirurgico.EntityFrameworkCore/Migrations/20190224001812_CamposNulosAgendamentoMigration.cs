using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class CamposNulosAgendamentoMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Agendamentos_Medicos_AnestesistaId",
                table: "Agendamentos");

            migrationBuilder.DropForeignKey(
                name: "FK_Agendamentos_Medicos_Auxiliar1Id",
                table: "Agendamentos");

            migrationBuilder.DropForeignKey(
                name: "FK_Agendamentos_Medicos_Auxiliar2Id",
                table: "Agendamentos");

            migrationBuilder.AlterColumn<int>(
                name: "Auxiliar2Id",
                table: "Agendamentos",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "Auxiliar1Id",
                table: "Agendamentos",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "AnestesistaId",
                table: "Agendamentos",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Agendamentos_Medicos_AnestesistaId",
                table: "Agendamentos",
                column: "AnestesistaId",
                principalTable: "Medicos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Agendamentos_Medicos_Auxiliar1Id",
                table: "Agendamentos",
                column: "Auxiliar1Id",
                principalTable: "Medicos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Agendamentos_Medicos_Auxiliar2Id",
                table: "Agendamentos",
                column: "Auxiliar2Id",
                principalTable: "Medicos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Agendamentos_Medicos_AnestesistaId",
                table: "Agendamentos");

            migrationBuilder.DropForeignKey(
                name: "FK_Agendamentos_Medicos_Auxiliar1Id",
                table: "Agendamentos");

            migrationBuilder.DropForeignKey(
                name: "FK_Agendamentos_Medicos_Auxiliar2Id",
                table: "Agendamentos");

            migrationBuilder.AlterColumn<int>(
                name: "Auxiliar2Id",
                table: "Agendamentos",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Auxiliar1Id",
                table: "Agendamentos",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "AnestesistaId",
                table: "Agendamentos",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Agendamentos_Medicos_AnestesistaId",
                table: "Agendamentos",
                column: "AnestesistaId",
                principalTable: "Medicos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Agendamentos_Medicos_Auxiliar1Id",
                table: "Agendamentos",
                column: "Auxiliar1Id",
                principalTable: "Medicos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Agendamentos_Medicos_Auxiliar2Id",
                table: "Agendamentos",
                column: "Auxiliar2Id",
                principalTable: "Medicos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
