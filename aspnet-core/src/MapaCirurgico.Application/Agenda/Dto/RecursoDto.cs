using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System.ComponentModel.DataAnnotations;

namespace Dex.MapaCirurgico.Agenda.Dto
{
    [AutoMapFrom(typeof(Recurso)), AutoMapTo(typeof(Recurso))]
    public class RecursoDto : EntityDto
    {
        [Required]
        public string Title { get; set; }

        public string EventColor { get; set; }
    }
}
