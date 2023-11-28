using Abp.Application.Services;
using Dex.MapaCirurgico.CadastrosBasicos.Dto;

namespace Dex.MapaCirurgico.CadastrosBasicos
{
    public interface IConvenioAppService : IAsyncCrudAppService<ConvenioDto>
    {
    }
}
