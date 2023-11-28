using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class TableFixItemApoioMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ItemApoio",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AgendamentoID = table.Column<int>(nullable: false),
                    EquipamentoImagem = table.Column<bool>(nullable: false),
                    BancoSangue = table.Column<bool>(nullable: false),
                    VagaUti = table.Column<bool>(nullable: false),
                    OpmeEstoque = table.Column<bool>(nullable: false),
                    OpmeConsignado = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemApoio", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemApoio_Agendamentos_AgendamentoID",
                        column: x => x.AgendamentoID,
                        principalTable: "Agendamentos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemApoio_AgendamentoID",
                table: "ItemApoio",
                column: "AgendamentoID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemApoio");
        }
    }
}
