using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System.ComponentModel.DataAnnotations;

namespace Dex.MapaCirurgico.CadastrosBasicos.Dto
{
    [AutoMapFrom(typeof(Convenio)), AutoMapTo(typeof(Convenio))]
    public class ConvenioDto : EntityDto<int>
    {
        [Required]
        public string Nome { get; set; }
    }
}
