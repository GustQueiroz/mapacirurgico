using Abp.Domain.Entities;
using Dex.MapaCirurgico.Agenda;
using MapaCirurgico.CadastrosBasicos;
using System;
using System.Collections.Generic;
using System.Text;

namespace MapaCirurgico.Agenda
{
    public class AgendamentoEquipamentoImagem : Entity
    {
        public int AgendamentoId { get; set; }
        public Agendamento Agendamento { get; set; }

        public int EquipamentoImagemId { get; set; }
        public EquipamentoImagem EquipamentoImagem { get; set; }
        
    }
}
