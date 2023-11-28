using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class ConvenioAgendamentoMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ConvenioId",
                table: "Agendamentos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Agendamentos_ConvenioId",
                table: "Agendamentos",
                column: "ConvenioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Agendamentos_Convenios_ConvenioId",
                table: "Agendamentos",
                column: "ConvenioId",
                principalTable: "Convenios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Agendamentos_Convenios_ConvenioId",
                table: "Agendamentos");

            migrationBuilder.DropIndex(
                name: "IX_Agendamentos_ConvenioId",
                table: "Agendamentos");

            migrationBuilder.DropColumn(
                name: "ConvenioId",
                table: "Agendamentos");
        }
    }
}
