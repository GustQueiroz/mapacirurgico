using Abp.Domain.Entities;
using Dex.MapaCirurgico.CadastrosBasicos;
using MapaCirurgico.Agenda;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dex.MapaCirurgico.Agenda
{
    public enum StatusAgendamento
    {
        [Description("Pré-agendado")]
        pre_agendado,
        [Description("Confirmado")]
        confirmado,
        [Description("Confirmado parcialmente")]
        confirmado_parcial,
        [Description("Fila de espera")]
        fila_espera
    }

    public class Agendamento : Entity
    {
        public Agendamento()
        {
            this.AgendamentoProdutos = new List<AgendamentoProduto>();
            this.AgendamentoProcedimentos = new List<AgendamentoProcedimento>();            
            this.AgendamentoEquipamentoImagem= new List<AgendamentoEquipamentoImagem>();
            this.StatusAgendamento = StatusAgendamento.pre_agendado;
        }

        [Required(ErrorMessage ="O título do agendamento é obrigatório"), MaxLength(256)]
        public string Title { get; set; }

        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public int ResourceId { get; set; }        
        [ForeignKey("ResourceId")]
        public Recurso Recurso  { get; set; }

        [Required(ErrorMessage ="O convênio é obrigatório")]
        public int ConvenioId { get; set; }
        public Convenio Convenio { get; set; }

        [Required(ErrorMessage ="A autorização do convênio é obrigatório")]
        [MaxLength(256)]
        public string AutorizacaoConvenio { get; set; }

        [Required(ErrorMessage ="O paciente é obrigatório")]
        public int PacienteId { get; set; }
        public Paciente Paciente { get; set; }

        [Required(ErrorMessage = "O cirurgião é obrigatório")]
        public int CirurgiaoId { get; set; }
        [ForeignKey("CirurgiaoId")]
        public Medico Cirurgiao { get; set; }
                
        public int? AnestesistaId { get; set; }
        [ForeignKey("AnestesistaId")]
        public Medico Anestesista { get; set; }

        public int? Auxiliar1Id { get; set; }
        [ForeignKey("Auxiliar1Id")]
        public Medico Auxiliar1 { get; set; }

        public int? Auxiliar2Id { get; set; }
        [ForeignKey("Auxiliar2Id")]
        public Medico Auxiliar2 { get; set; }        

        public bool BancoSangue { get; set; }

        public bool VagaUti { get; set; }

        public bool OpmeEstoque { get; set; }

        public bool OpmeConsignado { get; set; }

        public StatusAgendamento StatusAgendamento{ get; set; }

        public ICollection<AgendamentoProduto> AgendamentoProdutos { get; set; }
        public ICollection<AgendamentoProcedimento> AgendamentoProcedimentos { get; set; }        
        public ICollection<AgendamentoEquipamentoImagem> AgendamentoEquipamentoImagem { get; set; }

        /*ATRIBUTOS PARA AUDITORIA*/
        public long? UsuarioInclusao { get; set; }
        public long? UsuarioAlteracao { get; set; }
        public DateTime? DataInclusao { get; set; }
        public DateTime? DataAlteracao { get; set; }
        public DateTime? DataConfirmacao { get; set; }
    }
}
