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
    public class ProcedimentoAppService : AsyncCrudAppService<Procedimento, ProcedimentoDto, string>, IProcedimentoAppService
    {
        public ProcedimentoAppService(IRepository<Procedimento, string> repository) : base(repository)
        {
        }

        [DontWrapResult]
        public List<ProcedimentoDto> GetByTerm(string term)
        {            
            var procedimentos = this.Repository.GetAll();

            if (!String.IsNullOrWhiteSpace(term)) {
                term = term.Trim().ToLower();
                procedimentos = procedimentos.Where(proc => proc.Codigo.ToLower().Contains(term) || proc.Descricao.ToLower().Contains(term));
            }

            return procedimentos.MapTo<List<ProcedimentoDto>>();
        }
    }
}
