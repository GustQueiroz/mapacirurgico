using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace MapaCirurgico.Agenda.Dto
{
    [AutoMapFrom(typeof(AgendamentoEquipamentoImagem)), AutoMapTo(typeof(AgendamentoEquipamentoImagem))]
    public class AgendamentoEquipamentoImagemDto
    {
        public int AgendamentoId { get; set; }

        public int EquipamentoImagemId { get; set; }        

        public string EquipamentoImagemNome { get; set; }
        
    }
}
