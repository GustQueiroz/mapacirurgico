using Abp.Application.Services;
using MapaCirurgico.CadastrosBasicos.Dto;
using System.Collections.Generic;

namespace MapaCirurgico.CadastrosBasicos
{
    public interface IProcedimentoAppService : IAsyncCrudAppService<ProcedimentoDto, string>
    {
        List<ProcedimentoDto> GetByTerm(string term);
    }
}
