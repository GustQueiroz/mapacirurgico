using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class VinculoAgendamentoProdutos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Fornecedor",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CpfCnpj = table.Column<string>(maxLength: 20, nullable: true),
                    RazaoSocial = table.Column<string>(maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fornecedor", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Produto",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CodigoTuss = table.Column<string>(maxLength: 8, nullable: false),
                    Nome = table.Column<string>(maxLength: 500, nullable: false),
                    ReferenciaFabricante = table.Column<string>(maxLength: 100, nullable: true),
                    NumeroRegistroAnvisa = table.Column<string>(maxLength: 100, nullable: true),
                    DataVencimentoAnvisa = table.Column<DateTime>(nullable: true),
                    QuantidadeEstoque = table.Column<int>(nullable: false),
                    FornecedorId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Produto", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Produto_Fornecedor_FornecedorId",
                        column: x => x.FornecedorId,
                        principalTable: "Fornecedor",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AgendamentoProduto",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AgendamentoId = table.Column<int>(nullable: false),
                    ProdutoId = table.Column<int>(nullable: false),
                    Quantidade = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgendamentoProduto", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AgendamentoProduto_Agendamentos_AgendamentoId",
                        column: x => x.AgendamentoId,
                        principalTable: "Agendamentos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AgendamentoProduto_Produto_ProdutoId",
                        column: x => x.ProdutoId,
                        principalTable: "Produto",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AgendamentoProduto_AgendamentoId",
                table: "AgendamentoProduto",
                column: "AgendamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_AgendamentoProduto_ProdutoId",
                table: "AgendamentoProduto",
                column: "ProdutoId");

            migrationBuilder.CreateIndex(
                name: "IX_Produto_FornecedorId",
                table: "Produto",
                column: "FornecedorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AgendamentoProduto");

            migrationBuilder.DropTable(
                name: "Produto");

            migrationBuilder.DropTable(
                name: "Fornecedor");
        }
    }
}
