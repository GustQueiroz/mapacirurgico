using Abp.Domain.Entities;
using Dex.MapaCirurgico.Agenda;
using MapaCirurgico.CadastrosBasicos;
using System.ComponentModel.DataAnnotations;

namespace MapaCirurgico.Agenda
{
    public class AgendamentoProcedimento : Entity
    {
        [Required]
        public int AgendamentoId { get; set; }
        public Agendamento Agendamento { get; set; }

        [Required, MaxLength(10)]
        public string ProcedimentoId { get; set; }
        public Procedimento Procedimento { get; set; }
        
    }
}
