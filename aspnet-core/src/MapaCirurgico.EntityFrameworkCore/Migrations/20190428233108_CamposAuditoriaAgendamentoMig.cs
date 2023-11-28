using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Dex.MapaCirurgico.Migrations
{
    public partial class CamposAuditoriaAgendamentoMig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DataAlteracao",
                table: "Agendamentos",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataConfirmacao",
                table: "Agendamentos",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DataInclusao",
                table: "Agendamentos",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "UsuarioAlteracao",
                table: "Agendamentos",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "UsuarioInclusao",
                table: "Agendamentos",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataAlteracao",
                table: "Agendamentos");

            migrationBuilder.DropColumn(
                name: "DataConfirmacao",
                table: "Agendamentos");

            migrationBuilder.DropColumn(
                name: "DataInclusao",
                table: "Agendamentos");

            migrationBuilder.DropColumn(
                name: "UsuarioAlteracao",
                table: "Agendamentos");

            migrationBuilder.DropColumn(
                name: "UsuarioInclusao",
                table: "Agendamentos");
        }
    }
}
