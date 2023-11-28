using Abp.Application.Services;
using Dex.MapaCirurgico.Agenda.Dto;
using System.Collections.Generic;
using Abp.Domain.Repositories;
using System.Linq;
using Abp.AutoMapper;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Abp.UI;
using Abp.Application.Services.Dto;
using Abp.Linq.Extensions;

namespace Dex.MapaCirurgico.Agenda
{
    public class EquipeMedicaAppService : AsyncCrudAppService<EquipeMedica, EquipeMedicaDto, int, EquipeSearchDto>, IEquipeMedicaAppService
    {
        //private readonly IRepository<EquipeMedica> _equipeRepository;

        //public EquipeMedicaAppService(IRepository<EquipeMedica> equipeRepository)
        //{
        //    _equipeRepository = equipeRepository;
        //}

        public EquipeMedicaAppService(IRepository<EquipeMedica, int> repository) : base(repository)
        {

        }

        private EquipeMedica GetEquipeDataBase(int id)
        {
            return Repository.GetAll().Include("MedicosEquipes.Medico")
                .First(x => x.Id == id);
        }

        //public EquipeMedicaDto Get(int id)
        //{            
        //    var equipe = GetEquipeDataBase(id);

        //    var equipeDto = equipe.MapTo<EquipeMedicaDto>();

        //    //foreach(var medicoEquipe in equipe.MedicosEquipes)
        //    //{
        //    //    equipeDto.MedicosEquipes.Add(new MedicoEquipeDto
        //    //    {
        //    //        Id = medicoEquipe.Id,
        //    //        EquipeId = medicoEquipe.EquipeId,
        //    //        MedicoId = medicoEquipe.MedicoId,
        //    //        MedicoNome = medicoEquipe.Medico.Nome
        //    //    });
        //    //}

        //    return equipeDto;
        //}

        public List<EquipeMedicaDto> GetEquipesPorLider(int medicoLiderId)
        {
            var equipes = Repository.GetAll().Include("MedicosEquipes.Medico")
                .Where(x => x.MedicoLiderId == medicoLiderId);

            var equipesDto = equipes.MapTo<List<EquipeMedicaDto>>();

            return equipesDto;            
        }

        protected override IQueryable<EquipeMedica> CreateFilteredQuery(EquipeSearchDto input)
        {
            var equipes = Repository.GetAll().Include(x => x.MedicoLider).AsQueryable();

            if (input.IdMedico.HasValue && input.IdMedico > 0)
            {
                switch (input.TipoBusca)
                {
                    case TipoBuscaEquipe.SomenteEquipesQueLidera:
                        equipes = equipes.Where(x => x.MedicoLiderId == input.IdMedico.Value);
                        break;
                    case TipoBuscaEquipe.SomenteEquipesQueNaoLidera:
                        equipes = equipes.Where(x => x.MedicoLiderId != input.IdMedico
                        && x.MedicosEquipes.Any(y => y.MedicoId == input.IdMedico.Value));
                        break;
                    case TipoBuscaEquipe.TodasOcorrencias:
                        if(input.IdMedico.HasValue && input.IdMedico > 0)
                        {
                            equipes = equipes.Where(x => x.MedicoLiderId == input.IdMedico.Value
                            || x.MedicosEquipes.Any(y => y.MedicoId == input.IdMedico.Value));
                        }                        
                        break;
                    default:
                        break;
                }
            }
            
            equipes = equipes.WhereIf(!string.IsNullOrEmpty(input.NomeEquipe), x => x.Nome.Contains(input.NomeEquipe));            

            return equipes;
        }


        //public async Task<EquipeMedicaDto> Create(EquipeMedicaDto equipeDto)
        //{
        //    var equipe = equipeDto.MapTo<EquipeMedica>();

        //    //foreach(var aff in equipeDto.MedicosEquipes)
        //    //{
        //    //    equipe.MedicosEquipes.Add(new MedicoEquipe { MedicoId = aff.MedicoId });
        //    //}

        //    var id = await Repository.InsertAndGetIdAsync(equipe);

        //    return Get(id);
        //}

        //public async Task<EquipeMedicaDto> Update(EquipeMedicaDto equipeDto)
        //{
        //    var equipe = equipeDto.MapTo<EquipeMedica>();

        //    await Repository.UpdateAsync(equipe);

        //    return Get(equipeDto.Id);
        //}

        public async Task<EquipeMedicaDto> AddMedico(int idequipe, int idmedico)
        {
            var equipe = GetEquipeDataBase(idequipe);

            if (equipe.MedicosEquipes.Any(x => x.MedicoId == idmedico))
                throw new UserFriendlyException($"Médico já existe na equipe: {equipe.Nome}");

            equipe.MedicosEquipes.Add(new MedicoEquipe
            {
                MedicoId = idmedico
            });

            await Repository.UpdateAsync(equipe);

            await this.CurrentUnitOfWork.SaveChangesAsync();

            return await Get(new EntityDto<int>
            {
                Id = idequipe
            });
            
            //return Get(idequipe);
        }

        public void RemoveMedico(int idequipe, int idmedico)
        {            
            var equipe = GetEquipeDataBase(idequipe);

            if (!equipe.MedicosEquipes.Any(x => x.MedicoId == idmedico))
                throw new UserFriendlyException($"Médico não existe na equipe: {equipe.Nome}");

            bool retorno = equipe.MedicosEquipes.Remove(equipe.MedicosEquipes.First(x => x.MedicoId == idmedico));

            if (!retorno)
                throw new UserFriendlyException($"Erro ao excluir o médico");
        }

        public void RemoveAllMedicoByEquipe(int idequipe)
        {
            var equipe = GetEquipeDataBase(idequipe);

            if (equipe == null)
                throw new UserFriendlyException($"Equipe não existente");

            equipe.MedicosEquipes.Clear();

            this.Repository.Update(equipe);

            this.CurrentUnitOfWork.SaveChanges();
        }

        //public async Task Delete(int id)
        //{
        //    await Repository.DeleteAsync(id);
        //}
    }
}
