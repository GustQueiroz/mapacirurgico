using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class TableEquipamentoImagemMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EquipamentoImagem",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EquipamentoImagem", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AgendamentoEquipamentoImagem",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AgendamentoId = table.Column<int>(nullable: false),
                    EquipamentoImagemId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgendamentoEquipamentoImagem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AgendamentoEquipamentoImagem_Agendamentos_AgendamentoId",
                        column: x => x.AgendamentoId,
                        principalTable: "Agendamentos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AgendamentoEquipamentoImagem_EquipamentoImagem_EquipamentoIm~",
                        column: x => x.EquipamentoImagemId,
                        principalTable: "EquipamentoImagem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AgendamentoEquipamentoImagem_AgendamentoId",
                table: "AgendamentoEquipamentoImagem",
                column: "AgendamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_AgendamentoEquipamentoImagem_EquipamentoImagemId",
                table: "AgendamentoEquipamentoImagem",
                column: "EquipamentoImagemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AgendamentoEquipamentoImagem");

            migrationBuilder.DropTable(
                name: "EquipamentoImagem");
        }
    }
}
