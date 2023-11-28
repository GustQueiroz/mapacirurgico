using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System.ComponentModel.DataAnnotations;

namespace Dex.MapaCirurgico.Agenda.Dto
{
    [AutoMapFrom(typeof(Paciente)), AutoMapTo(typeof(Paciente))]
    public class PacienteDto : EntityDto
    {
        [Required(ErrorMessage ="O Nome é obrigatório.")]
        public string Nome { get; set; }
        
        public string CodigoCliente { get; set; }

        public bool Particular { get; set; }

        [Required(ErrorMessage ="O E-mail é obrigatório"), MaxLength(256)]
        public string Email { get; set; }
    }
}
