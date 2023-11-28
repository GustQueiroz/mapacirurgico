using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Dex.MapaCirurgico.Agenda.Dto
{
    public class EquipeSearchDto : PagedAndSortedResultRequestDto
    {
        public int? IdMedico { get; set; }
        public string NomeEquipe { get; set; }
        public TipoBuscaEquipe TipoBusca { get; set; }

    }

    public enum TipoBuscaEquipe
    {
        SomenteEquipesQueLidera = 0,
        SomenteEquipesQueNaoLidera = 1,
        TodasOcorrencias = 2
    }
}
