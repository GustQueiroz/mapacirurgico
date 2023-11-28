using Abp.Application.Services;
using Abp.Domain.Repositories;
using MapaCirurgico.CadastrosBasicos.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace MapaCirurgico.CadastrosBasicos
{
    public class EquipamentoImagemAppService : AsyncCrudAppService<EquipamentoImagem, EquipamentoImagemDto>, IEquipamentoImagemAppService
    {
        public EquipamentoImagemAppService(IRepository<EquipamentoImagem, int> repository) : base(repository)
        {
        }

    }
}
