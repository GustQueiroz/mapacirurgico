using Abp.Application.Services;
using Dex.MapaCirurgico.CadastrosBasicos.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace Dex.MapaCirurgico.CadastrosBasicos
{
    public interface IEspecialidadeAppService : IAsyncCrudAppService<EspecialidadeDto>
    {
    }
}
