using Abp.Application.Services;
using Abp.Domain.Repositories;
using Dex.MapaCirurgico.CadastrosBasicos.Dto;

namespace Dex.MapaCirurgico.CadastrosBasicos
{
    public class EspecialidadeAppService : AsyncCrudAppService<Especialidade, EspecialidadeDto>, IEspecialidadeAppService
    {
        public EspecialidadeAppService(IRepository<Especialidade, int> repository) : base(repository)
        {
        }
    
    }
}
