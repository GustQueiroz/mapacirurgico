using System;
using System.Collections.Generic;
using System.Linq;
using Abp.Application.Services;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Web.Models;
using MapaCirurgico.CadastrosBasicos.Dto;

namespace MapaCirurgico.CadastrosBasicos
{
    public class FornecedorAppService : AsyncCrudAppService<Fornecedor, FornecedorDto>, IFornecedorAppService
    {
        public FornecedorAppService(IRepository<Fornecedor, int> repository) : base(repository)
        {
        }

        [DontWrapResult]
        public List<FornecedorDto> GetByTerm(string term)
        {
            var fornecedores = this.Repository.GetAll();

            if (!String.IsNullOrWhiteSpace(term))
            {
                term = term.Trim().ToLower();
                fornecedores = fornecedores.Where(fornec => fornec.CpfCnpj.ToLower().Contains(term) || fornec.RazaoSocial.ToLower().Contains(term));
            }

            return fornecedores.MapTo<List<FornecedorDto>>();
        }
        
    }
}
