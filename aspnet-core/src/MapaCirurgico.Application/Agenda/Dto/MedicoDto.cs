using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Dex.MapaCirurgico.Agenda.Dto
{
    [AutoMapFrom(typeof(Medico)), AutoMapTo(typeof(Medico))]
    public class MedicoDto : EntityDto<int>
    {
        [Required, MaxLength(10)]
        public string Crm { get; set; }

        [Required, MaxLength(2)]
        public string UfConselho { get; set; }

        [Required, MaxLength(256)]
        public string Nome { get; set; }

        [MaxLength(500)]
        public string Endereco { get; set; }

        [Required, MaxLength(256)]
        public string Telefone { get; set; }

        [Required]
        public bool Anestesista { get; set; }

        [Required]
        public int EspecialidadeId { get; set; }

        public string EspecialidadeNome { get; set; }

        //public Especialidade Especialidade { get; set; }

        //public List<MedicoEquipe> Equipes { get; set; }
    }
}
