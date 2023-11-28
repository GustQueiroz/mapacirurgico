using Abp.Application.Services;
using Abp.Domain.Repositories;
using Dex.MapaCirurgico.Agenda.Dto;

namespace Dex.MapaCirurgico.Agenda
{
    public class PacienteAppService : AsyncCrudAppService<Paciente, PacienteDto>, IPacienteAppService
    {
        public PacienteAppService(IRepository<Paciente, int> repository) : base(repository)
        {
        }

    }
}
