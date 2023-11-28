using System.Threading.Tasks;
using Abp.Application.Services;
using MapaCirurgico.Authorization.Accounts.Dto;

namespace MapaCirurgico.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
