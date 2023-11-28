using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MapaCirurgico.MultiTenancy.Dto;

namespace MapaCirurgico.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

