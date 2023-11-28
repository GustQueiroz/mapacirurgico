using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class aff : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MedicoLiderId",
                table: "Equipes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Equipes_MedicoLiderId",
                table: "Equipes",
                column: "MedicoLiderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Equipes_Medicos_MedicoLiderId",
                table: "Equipes",
                column: "MedicoLiderId",
                principalTable: "Medicos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Equipes_Medicos_MedicoLiderId",
                table: "Equipes");

            migrationBuilder.DropIndex(
                name: "IX_Equipes_MedicoLiderId",
                table: "Equipes");

            migrationBuilder.DropColumn(
                name: "MedicoLiderId",
                table: "Equipes");
        }
    }
}
