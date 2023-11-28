using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System.ComponentModel.DataAnnotations;

namespace MapaCirurgico.CadastrosBasicos.Dto
{
    [AutoMapFrom(typeof(Fornecedor)), AutoMapTo(typeof(Fornecedor))]
    public class FornecedorDto : EntityDto<int>
    {
        [MaxLength(20)]
        public string CpfCnpj { get; set; }

        [Required(ErrorMessage ="A Razão Social é obrigatória"), MaxLength(500)]
        public string RazaoSocial { get; set; }

        [Required(ErrorMessage ="O E-mail é obrigatório."), MaxLength(100)]
        public string Email { get; set; }
    }
}
