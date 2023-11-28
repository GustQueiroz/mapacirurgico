using Abp.Application.Services;
using Dex.MapaCirurgico.Agenda.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Dex.MapaCirurgico.Agenda
{
    public interface IEquipeMedicaAppService : IApplicationService
    {
        //EquipeMedicaDto Get(int id);
        List<EquipeMedicaDto> GetEquipesPorLider(int medicoLiderId);
        //Task<EquipeMedicaDto> Create(EquipeMedicaDto equipeDto);
        //Task<EquipeMedicaDto> Update(EquipeMedicaDto equipeDto);
        //Task Delete(int id);
        Task<EquipeMedicaDto> AddMedico(int idequipe, int idmedico);
        void RemoveMedico(int idequipe, int idmedico);

    }
}
