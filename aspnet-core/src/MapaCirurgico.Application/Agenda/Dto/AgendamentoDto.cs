using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using MapaCirurgico.Agenda;
using MapaCirurgico.Agenda.Dto;
using MapaCirurgico.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;

namespace Dex.MapaCirurgico.Agenda.Dto
{
    [AutoMapFrom(typeof(Agendamento)), AutoMapTo(typeof(Agendamento))]
    public class AgendamentoDto : EntityDto<int>
    {
        [Required(ErrorMessage ="O título é obrigatório")]
        public string Title { get; set; }

        [Required(ErrorMessage = "A data e hora de início é obrigatório")]
        public DateTime Start { get; set; }

        public string StartStr => Start.ToString("dd/MM/yyyy HH:mm");

        [Required(ErrorMessage ="A data e hora de término é obrigatório")]
        public DateTime End { get; set; }
        public string EndStr => End.ToString("dd/MM/yyyy HH:mm");


        [Required]
        public int ResourceId { get; set; }

        public string ResourceTitle { get; set; }
        public string RecursoTitle { get; set; }

        [Required(ErrorMessage ="O convênio é obrigatório")]
        public int ConvenioId { get; set; }

        [Required, MaxLength(256)]
        public string ConvenioNome { get; set; }

        [Required, MaxLength(256)]
        public string AutorizacaoConvenio { get; set; }

        [Required(ErrorMessage ="O paciente é obrigatório")]
        public int PacienteId { get; set; }

        [Required, MaxLength(256)]
        public string PacienteNome { get; set; }

        [Required, MaxLength(17)]
        public string PacienteCodigoCliente { get; set; }

        [Required(ErrorMessage = "O médico é obrigatório")]
        public int CirurgiaoId { get; set; }

        public string CirurgiaoNome { get; set; }

        public int? AnestesistaId { get; set; }

        public int? Auxiliar1Id { get; set; }

        public int? Auxiliar2Id { get; set; }

        public bool BancoSangue { get; set; }

        public bool VagaUti { get; set; }

        public bool OpmeEstoque { get; set; }

        public bool OpmeConsignado { get; set; }

        public StatusAgendamento StatusAgendamento { get; set; }

        public string StatusAgendamentoStr => StatusAgendamento.GetDescription();

        public ICollection<AgendamentoProdutoDto> AgendamentoProdutos { get; set; }

        public ICollection<AgendamentoProcedimentoDto> AgendamentoProcedimentos { get; set; }

        public ICollection<AgendamentoEquipamentoImagemDto> AgendamentoEquipamentoImagem { get; set; }

        /*ATRIBUTOS PARA AUDITORIA*/
        public long? UsuarioInclusao { get; set; }
        public long? UsuarioAlteracao { get; set; }
        public DateTime? DataInclusao { get; set; }        
        public DateTime? DataAlteracao { get; set; }
        public DateTime? DataConfirmacao { get; set; }        
    }
}
