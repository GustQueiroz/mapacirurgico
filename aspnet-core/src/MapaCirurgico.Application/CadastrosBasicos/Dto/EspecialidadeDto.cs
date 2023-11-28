using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dex.MapaCirurgico.CadastrosBasicos.Dto
{
    [AutoMapFrom(typeof(Especialidade)), AutoMapTo(typeof(Especialidade))]
    public class EspecialidadeDto : EntityDto<int>
    {
        [Required]
        public string Nome { get; set; }
    }
}
