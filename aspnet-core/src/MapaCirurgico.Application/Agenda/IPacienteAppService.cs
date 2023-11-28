using Abp.Application.Services;
using Dex.MapaCirurgico.Agenda.Dto;

namespace Dex.MapaCirurgico.Agenda
{
    public interface IPacienteAppService : IAsyncCrudAppService<PacienteDto>
    {
    }
}
