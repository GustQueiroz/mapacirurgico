using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class AuxiliarAgendamentoMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AnestesistaId",
                table: "Agendamentos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Auxiliar1Id",
                table: "Agendamentos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Auxiliar2Id",
                table: "Agendamentos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CirurgiaoId",
                table: "Agendamentos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Agendamentos_AnestesistaId",
                table: "Agendamentos",
                column: "AnestesistaId");

            migrationBuilder.CreateIndex(
                name: "IX_Agendamentos_Auxiliar1Id",
                table: "Agendamentos",
                column: "Auxiliar1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Agendamentos_Auxiliar2Id",
                table: "Agendamentos",
                column: "Auxiliar2Id");

            migrationBuilder.CreateIndex(
                name: "IX_Agendamentos_CirurgiaoId",
                table: "Agendamentos",
                column: "CirurgiaoId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Agendamentos_Medicos_CirurgiaoId",
                table: "Agendamentos",
                column: "CirurgiaoId",
                principalTable: "Medicos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.DropForeignKey(
                name: "FK_Agendamentos_Medicos_CirurgiaoId",
                table: "Agendamentos");

            migrationBuilder.DropIndex(
                name: "IX_Agendamentos_AnestesistaId",
                table: "Agendamentos");

            migrationBuilder.DropIndex(
                name: "IX_Agendamentos_Auxiliar1Id",
                table: "Agendamentos");

            migrationBuilder.DropIndex(
                name: "IX_Agendamentos_Auxiliar2Id",
                table: "Agendamentos");

            migrationBuilder.DropIndex(
                name: "IX_Agendamentos_CirurgiaoId",
                table: "Agendamentos");

            migrationBuilder.DropColumn(
                name: "AnestesistaId",
                table: "Agendamentos");

            migrationBuilder.DropColumn(
                name: "Auxiliar1Id",
                table: "Agendamentos");

            migrationBuilder.DropColumn(
                name: "Auxiliar2Id",
                table: "Agendamentos");

            migrationBuilder.DropColumn(
                name: "CirurgiaoId",
                table: "Agendamentos");
        }
    }
}
