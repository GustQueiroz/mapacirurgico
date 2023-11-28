using Abp.Application.Services;
using Dex.MapaCirurgico.Agenda.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dex.MapaCirurgico.Agenda
{
    public interface IAgendamentoAppService : IAsyncCrudAppService<AgendamentoDto>
    {
        Task ChangeTime(ChangeTimeDto changeTimeDto);
    }
}
