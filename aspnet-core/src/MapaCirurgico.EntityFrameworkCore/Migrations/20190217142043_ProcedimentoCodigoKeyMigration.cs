using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class ProcedimentoCodigoKeyMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Procedimentos",
                table: "Procedimentos");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Procedimentos",
                nullable: false,
                oldClrType: typeof(int))
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Procedimentos",
                table: "Procedimentos",
                column: "Codigo");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Procedimentos",
                table: "Procedimentos");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Procedimentos",
                nullable: false,
                oldClrType: typeof(int))
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Procedimentos",
                table: "Procedimentos",
                column: "Id");
        }
    }
}
