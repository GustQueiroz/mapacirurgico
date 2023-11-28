using Abp.Application.Services;
using Abp.Domain.Repositories;
using Dex.MapaCirurgico.CadastrosBasicos.Dto;

namespace Dex.MapaCirurgico.CadastrosBasicos
{
    public class ConvenioAppService : AsyncCrudAppService<Convenio, ConvenioDto>, IConvenioAppService
    {
        public ConvenioAppService(IRepository<Convenio, int> repository) : base(repository)
        {
        }
    
    }
}
