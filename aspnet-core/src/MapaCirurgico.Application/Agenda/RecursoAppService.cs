using Abp.Application.Services;
using Dex.MapaCirurgico.Agenda.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using Abp.Domain.Repositories;
using Abp.AutoMapper;
using Abp.Web.Models;

namespace Dex.MapaCirurgico.Agenda
{
    public class RecursoAppService : AsyncCrudAppService<Recurso, RecursoDto>, IRecursoAppService
    {
        public  RecursoAppService(IRepository<Recurso, int> repository) : base(repository)
        {

        }

        [DontWrapResult]
        public List<RecursoDto> GetAllNoPaging()
        {
            var recursos = this.Repository.GetAllList();
            var recursosDto = recursos.MapTo<List<RecursoDto>>();

            return recursosDto;
        }
    }
}
