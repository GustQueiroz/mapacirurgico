using System.Threading.Tasks;
using Abp.Application.Services;
using MapaCirurgico.Sessions.Dto;

namespace MapaCirurgico.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
