using Abp.Application.Services;
using Dex.MapaCirurgico.Agenda.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Dex.MapaCirurgico.Agenda
{
    public interface IMedicoAppService : IAsyncCrudAppService<MedicoDto>
    {
        List<MedicoDto> GetByName(string name);
    }
}
