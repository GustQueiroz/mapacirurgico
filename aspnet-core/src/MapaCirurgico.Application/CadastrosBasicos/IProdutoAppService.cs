using Abp.Application.Services;
using MapaCirurgico.CadastrosBasicos.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace MapaCirurgico.CadastrosBasicos
{
    public interface IProdutoAppService : IAsyncCrudAppService<ProdutoDto>
    {
        List<ProdutoDto> GetByTerm(string term, int? fornecedorId);
    }
}
