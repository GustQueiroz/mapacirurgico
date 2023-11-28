using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System.ComponentModel.DataAnnotations;

namespace MapaCirurgico.CadastrosBasicos.Dto
{
    [AutoMapFrom(typeof(EquipamentoImagem)), AutoMapTo(typeof(EquipamentoImagem))]
    public class EquipamentoImagemDto : EntityDto<int>
    {
        [Required(ErrorMessage ="O Nome do equipamento de imagem é obrigatório."), StringLength(256)]
        public string Nome { get; set; }
    }
}
