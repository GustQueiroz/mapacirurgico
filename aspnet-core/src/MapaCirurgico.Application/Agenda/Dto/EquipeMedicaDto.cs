using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Dex.MapaCirurgico.Agenda.Dto
{
    [AutoMapFrom(typeof(EquipeMedica)), AutoMapTo(typeof(EquipeMedica))]
    public class EquipeMedicaDto : EntityDto<int>
    {
        public EquipeMedicaDto()
        {
            this.MedicosEquipes = new List<MedicoEquipeDto>();
        }

        [Required(ErrorMessage ="O nome da equipe médica é obrigatório!"), MaxLength(256)]
        public string Nome { get; set; }

        public int MedicoLiderId { get; set; }
        
        public MedicoLiderDto MedicoLider { get; set; }

        public List<MedicoEquipeDto> MedicosEquipes { get; set; }
    }

    [AutoMapFrom(typeof(MedicoEquipe)), AutoMapTo(typeof(MedicoEquipe))]
    public class MedicoEquipeDto : EntityDto<int>
    {

        public int MedicoId { get; set; }
        public int EquipeId { get; set; }

        public string MedicoNome { get; set; }
        public bool Anestesista { get; set; }
    }

    [AutoMapFrom(typeof(Medico)), AutoMapTo(typeof(Medico))]
    public class MedicoLiderDto : EntityDto<int>
    {        
        public string Nome { get; set; }     
    }

}
