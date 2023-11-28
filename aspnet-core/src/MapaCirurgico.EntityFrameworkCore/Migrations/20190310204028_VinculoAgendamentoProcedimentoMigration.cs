using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class VinculoAgendamentoProcedimentoMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AgendamentoProcedimento",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AgendamentoId = table.Column<int>(nullable: false),
                    ProcedimentoId = table.Column<int>(nullable: false),
                    ProcedimentoId1 = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgendamentoProcedimento", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AgendamentoProcedimento_Agendamentos_AgendamentoId",
                        column: x => x.AgendamentoId,
                        principalTable: "Agendamentos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AgendamentoProcedimento_Procedimentos_ProcedimentoId1",
                        column: x => x.ProcedimentoId1,
                        principalTable: "Procedimentos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AgendamentoProcedimento_AgendamentoId",
                table: "AgendamentoProcedimento",
                column: "AgendamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_AgendamentoProcedimento_ProcedimentoId1",
                table: "AgendamentoProcedimento",
                column: "ProcedimentoId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AgendamentoProcedimento");
        }
    }
}
