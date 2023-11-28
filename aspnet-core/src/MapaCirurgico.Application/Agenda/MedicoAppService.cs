using Abp.Application.Services;
using Dex.MapaCirurgico.Agenda.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using Abp.Domain.Repositories;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Microsoft.EntityFrameworkCore;
using Abp.Web.Models;
using Abp.AutoMapper;

namespace Dex.MapaCirurgico.Agenda
{    
    public class MedicoAppService : AsyncCrudAppService<Medico, MedicoDto>, IMedicoAppService
    {
        public MedicoAppService(IRepository<Medico, int> repository) : base(repository)
        {
            
        }
               
        [DontWrapResult]
        public List<MedicoDto> GetByName(string name)
        {
            var medicos = this.Repository.GetAll();

            if (!String.IsNullOrWhiteSpace(name))
                medicos = medicos.Where(med => med.Nome.ToLower().Contains(name.ToLower()));

            return medicos.MapTo<List<MedicoDto>>();
        }

        protected override IQueryable<Medico> CreateFilteredQuery(PagedAndSortedResultRequestDto input)
        {
            return base.CreateFilteredQuery(input).Include(x => x.Especialidade);
        }
    }
}
