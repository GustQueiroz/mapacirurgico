using Abp.Application.Services.Dto;

namespace MapaCirurgico.Roles.Dto
{
    public class PagedRoleResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
    }
}

