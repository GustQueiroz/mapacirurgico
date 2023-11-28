using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using MapaCirurgico.Authorization.Roles;
using MapaCirurgico.Authorization.Users;
using MapaCirurgico.MultiTenancy;
using Dex.MapaCirurgico.Agenda;
using Dex.MapaCirurgico.CadastrosBasicos;
using MapaCirurgico.CadastrosBasicos;
using MapaCirurgico.Agenda;
using MapaCirurgico.Mail;

namespace MapaCirurgico.EntityFrameworkCore
{
    public class MapaCirurgicoDbContext : AbpZeroDbContext<Tenant, Role, User, MapaCirurgicoDbContext>
    {
        /* Define a DbSet for each entity of the application */
        /* Define an IDbSet for each entity of the application */
        public DbSet<Agendamento> Agendamentos { get; set; }
        public DbSet<Recurso> Recursos { get; set; }
        public DbSet<Especialidade> Especialidades { get; set; }
        public DbSet<Medico> Medicos { get; set; }
        public DbSet<EquipeMedica> Equipes { get; set; }
        public DbSet<Convenio> Convenios { get; set; }
        public DbSet<Paciente> Pacientes { get; set; }
        public DbSet<Procedimento> Procedimentos { get; set; }
        public DbSet<Fornecedor> Fornecedor { get; set; }
        public DbSet<Produto> Produto { get; set; }
        public DbSet<EquipamentoImagem> EquipamentoImagem { get; set; }
        public DbSet<ProdutoEmailEnviado> ProdutoEmailEnviado { get; set; }

        public MapaCirurgicoDbContext(DbContextOptions<MapaCirurgicoDbContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {            

            modelBuilder.Entity<Agendamento>()
                .Property(c => c.StatusAgendamento)
                .HasConversion<string>();

            
            base.OnModelCreating(modelBuilder);
        }
    }
}
