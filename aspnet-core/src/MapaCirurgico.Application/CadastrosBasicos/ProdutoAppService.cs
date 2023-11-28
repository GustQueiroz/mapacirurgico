using Abp.Application.Services;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using MapaCirurgico.CadastrosBasicos.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MapaCirurgico.CadastrosBasicos
{
    public class ProdutoAppService : AsyncCrudAppService<Produto, ProdutoDto>, IProdutoAppService
    {
        public ProdutoAppService(IRepository<Produto, int> repository) : base(repository)
        {

        }

        public List<ProdutoDto> GetByTerm(string term, int? fornecedorId)
        {
            var produtos = this.Repository.GetAll();                                          
            if (fornecedorId.HasValue)
            {
                produtos = produtos.Where(prod => prod.FornecedorId == fornecedorId.Value);
            }
            if (!String.IsNullOrWhiteSpace(term))
            {
                term = term.Trim().ToLower();
                produtos = produtos.Where(prod => prod.Nome.ToLower().Contains(term));
            }
            

            return produtos.MapTo<List<ProdutoDto>>();
        }
    }
}
