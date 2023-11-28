using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class ItemApoioAgendamentoMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemApoio_Agendamentos_AgendamentoID",
                table: "ItemApoio");

            migrationBuilder.DropIndex(
                name: "IX_ItemApoio_AgendamentoID",
                table: "ItemApoio");

            migrationBuilder.AddColumn<int>(
                name: "ItemApoioId",
                table: "Agendamentos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Agendamentos_ItemApoioId",
                table: "Agendamentos",
                column: "ItemApoioId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Agendamentos_ItemApoio_ItemApoioId",
                table: "Agendamentos",
                column: "ItemApoioId",
                principalTable: "ItemApoio",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Agendamentos_ItemApoio_ItemApoioId",
                table: "Agendamentos");

            migrationBuilder.DropIndex(
                name: "IX_Agendamentos_ItemApoioId",
                table: "Agendamentos");

            migrationBuilder.DropColumn(
                name: "ItemApoioId",
                table: "Agendamentos");

            migrationBuilder.CreateIndex(
                name: "IX_ItemApoio_AgendamentoID",
                table: "ItemApoio",
                column: "AgendamentoID");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemApoio_Agendamentos_AgendamentoID",
                table: "ItemApoio",
                column: "AgendamentoID",
                principalTable: "Agendamentos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
