using Abp.Application.Services;
using MapaCirurgico.CadastrosBasicos.Dto;
using System.Collections.Generic;

namespace MapaCirurgico.CadastrosBasicos
{
    public interface IFornecedorAppService : IAsyncCrudAppService<FornecedorDto>
    {
        List<FornecedorDto> GetByTerm(string term);
    }
}
