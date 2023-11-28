using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System.ComponentModel.DataAnnotations;

namespace MapaCirurgico.CadastrosBasicos.Dto
{
    [AutoMapFrom(typeof(Procedimento)), AutoMapTo(typeof(Procedimento))]
    public class ProcedimentoDto : EntityDto<string>
    {
        [Required, MaxLength(10), Key]
        public string Codigo { get; set; }

        [Required, MaxLength(500)]
        public string Descricao { get; set; }

        public string CodigoDescricaoFormatado {
            get {
                return this.Codigo + " - " + this.Descricao;
            }
        }
    }
}
