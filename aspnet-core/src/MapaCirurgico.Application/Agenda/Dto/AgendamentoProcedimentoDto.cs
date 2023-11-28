using Abp.AutoMapper;
using System.ComponentModel.DataAnnotations;

namespace MapaCirurgico.Agenda.Dto
{
    [AutoMapFrom(typeof(AgendamentoProcedimento)), AutoMapTo(typeof(AgendamentoProcedimento))]
    public class AgendamentoProcedimentoDto
    {
        [Required]
        public int AgendamentoId { get; set; }    

        [Required, MaxLength(10)]
        public string ProcedimentoId { get; set; }
        public string ProcedimentoDescricao { get; set; }
    }
}
