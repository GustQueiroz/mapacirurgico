using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.UI;
using Dex.MapaCirurgico.Agenda.Dto;
using MapaCirurgico.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dex.MapaCirurgico.Agenda
{
    public class AgendamentoAppService : AsyncCrudAppService<Agendamento, AgendamentoDto>, IAgendamentoAppService
    {
        private readonly IUnitOfWorkManager _unitOfWorkManager;

        public AgendamentoAppService(IUnitOfWorkManager unitOfWorkManager, IRepository<Agendamento, int> repository) : base(repository)
        {
            _unitOfWorkManager = unitOfWorkManager;
        }

        public override async Task<AgendamentoDto> Get(EntityDto<int> input)
        {
            var entity = await Repository.GetAll()
                .AsNoTracking()
                .Include(ag => ag.Paciente)
                .Include(ag => ag.Convenio)
                .Include(ag => ag.Cirurgiao)
                .Include(x => x.AgendamentoProdutos).ThenInclude(y => y.Produto)
                .Include(x => x.AgendamentoProcedimentos).ThenInclude(y => y.Procedimento)
                .Include(x => x.AgendamentoEquipamentoImagem).ThenInclude(y => y.EquipamentoImagem)
                .FirstOrDefaultAsync(x => x.Id == input.Id);

            var dto = entity.MapTo<AgendamentoDto>();
            return dto;
        }
       
        public async Task<List<AgendamentoDto>> GetAllWithInclude(string filter = "", string sort ="", int skip = 0, int take = 10)
        {


            var agendamentosQuery = Repository.GetAll()
                                        .AsNoTracking()
                                        .Include(a => a.Paciente)
                                        .Include(a => a.Cirurgiao)
                                        .Include(a => a.Convenio)
                                        .Include(a => a.Recurso)
                                        .Include(a => a.AgendamentoProdutos).ThenInclude(y => y.Produto)
                                        .Include(a => a.AgendamentoProcedimentos).ThenInclude(y => y.Procedimento)
                                        .Include(a => a.AgendamentoEquipamentoImagem).ThenInclude(y => y.EquipamentoImagem)
                                        .AsQueryable();
            if (!String.IsNullOrWhiteSpace(filter))
            {
                filter = filter.ToLower();
                agendamentosQuery = agendamentosQuery.Where(a => a.Paciente.Nome.ToLower().Contains(filter) ||
                                                            a.Title.ToLower().Contains(filter) ||
                                                            a.Cirurgiao.Nome.ToLower().Contains(filter) ||
                                                            a.Convenio.Nome.ToLower().Contains(filter) ||
                                                            a.Recurso.Title.ToLower().Contains(filter) ||
                                                            a.Start.ToString("dd/MM/yyyy").Contains(filter) ||
                                                            a.End.ToString("dd/MM/yyyy").Contains(filter) ||
                                                            a.StatusAgendamento.GetDescription().Contains(filter));
            }
            if(!String.IsNullOrEmpty(sort) && sort.Trim().ToLower() == "desc")
            {
                agendamentosQuery = agendamentosQuery.OrderByDescending(a => a.Start);
            }
            else
            {
                agendamentosQuery = agendamentosQuery.OrderBy(a => a.Start);
            }
            var agendamentos = await  agendamentosQuery.Skip(skip)
                                                       .Take(take)
                                                       .ToListAsync();

            var dto = agendamentos.MapTo<List<AgendamentoDto>>();
            return dto;
        }

        private StatusAgendamento StatusMachine(AgendamentoDto agendamentoDto)
        {
            var conflitos = VerificaConflitosHorarios(agendamentoDto, agendamentoDto.Start.AddDays(-1), agendamentoDto.End.AddDays(1));
            if (agendamentoDto.StatusAgendamento == StatusAgendamento.pre_agendado && conflitos.Result.Any())
            {
                return StatusAgendamento.fila_espera;
            }
            else if (agendamentoDto.StatusAgendamento == StatusAgendamento.confirmado
                && agendamentoDto.AgendamentoProdutos.Any(ap => !ap.Confirmado))
            {
                var conflitosConfirmados = conflitos.Result.Where(c => c.StatusAgendamento == StatusAgendamento.confirmado || c.StatusAgendamento == StatusAgendamento.confirmado_parcial);
                this.SetStatus(conflitosConfirmados, StatusAgendamento.fila_espera);
                return StatusAgendamento.confirmado_parcial;
            }
            else if (agendamentoDto.StatusAgendamento == StatusAgendamento.confirmado
                && agendamentoDto.AgendamentoProdutos.All(ap => ap.Confirmado))
            {
                var conflitosConfirmados = conflitos.Result.Where(c => c.StatusAgendamento == StatusAgendamento.confirmado || c.StatusAgendamento == StatusAgendamento.confirmado_parcial);
                this.SetStatus(conflitosConfirmados, StatusAgendamento.fila_espera);
                return StatusAgendamento.confirmado;
            }
            else if (agendamentoDto.StatusAgendamento == StatusAgendamento.fila_espera
                && !conflitos.Result.Any())
            {
                return StatusAgendamento.pre_agendado;
            }

            return agendamentoDto.StatusAgendamento;
        }

        private void SetStatus(IEnumerable<AgendamentoDto> agendamentosDto, StatusAgendamento status)
        {
            CheckUpdatePermission();

            var agendamentos = agendamentosDto.MapTo<List<Agendamento>>();
            foreach (var agendamento in agendamentos)
            {
                agendamento.Id = agendamento.Id;
                agendamento.StatusAgendamento = status;
                this.Repository.Update(agendamento);

            }

            this.CurrentUnitOfWork.SaveChanges();


        }

        private async Task<List<AgendamentoDto>> VerificaConflitosHorarios(AgendamentoDto agendamento, DateTime start, DateTime end)
        {
            var entity = await Repository.GetAll()
                .AsNoTracking()
                .Where(x => x.Start >= start && x.End <= end && x.Id != agendamento.Id && x.ResourceId == agendamento.ResourceId)
                .ToListAsync();

            var agendamentosDto = entity.MapTo<List<AgendamentoDto>>();

            var agendamentosConflitantes = new List<AgendamentoDto>();
            foreach (var agendamentoDto in agendamentosDto)
            {

                if (agendamento.Start >= agendamentoDto.Start && agendamento.Start < agendamentoDto.End)
                    agendamentosConflitantes.Add(agendamentoDto);
                else if (agendamento.End > agendamentoDto.Start && agendamento.End <= agendamentoDto.End)
                    agendamentosConflitantes.Add(agendamentoDto);

            }

            return agendamentosConflitantes;

        }

        private KeyValuePair<bool, string> ConflitoMedico(AgendamentoDto agendamentoDto)
        {
            var conflitos = VerificaConflitosHorarios(agendamentoDto, agendamentoDto.Start.AddDays(-1), agendamentoDto.End.AddDays(1)).Result;
            bool resultado = false;
            string message = "";
            var ids = conflitos.Select(ag => ag.CirurgiaoId)
                               .Union(conflitos.Where(ag => ag.AnestesistaId.HasValue).Select(ag => ag.AnestesistaId.Value))
                               .Union(conflitos.Where(ag => ag.Auxiliar1Id.HasValue).Select(ag => ag.Auxiliar1Id.Value))
                               .Union(conflitos.Where(ag => ag.Auxiliar2Id.HasValue).Select(ag => ag.Auxiliar2Id.Value));

            if (ids.Contains(agendamentoDto.CirurgiaoId))
            {
                resultado = true;
                message += "O Cirurgião já se encontra alocado para o horário escolhido";
            }
            else if (agendamentoDto.AnestesistaId.HasValue && ids.Contains(agendamentoDto.AnestesistaId.Value))
            {
                resultado = true;
                message += "O Anestesista já se encontra alocado para o horário escolhido";
            }
            else if (agendamentoDto.Auxiliar1Id.HasValue && ids.Contains(agendamentoDto.Auxiliar1Id.Value))
            {
                resultado = true;
                message += "O Auxiliar 1 já se encontra alocado para o horário escolhido";
            }
            else if (agendamentoDto.Auxiliar2Id.HasValue && ids.Contains(agendamentoDto.Auxiliar2Id.Value))
            {
                resultado = true;
                message += "O Auxiliar 2 já se encontra alocado para o horário escolhido";
            }
            return new KeyValuePair<bool, string>(resultado, message);
        }
        
        public override async Task<AgendamentoDto> Update(AgendamentoDto input)
        {
            using (var unitOfWork = _unitOfWorkManager.Begin())
            {
                CheckUpdatePermission();
                if (input == null)
                    throw new UserFriendlyException("Agendamento nulo");

                var conflitoMedico = this.ConflitoMedico(input);
                if (conflitoMedico.Key)
                {
                    throw new UserFriendlyException(conflitoMedico.Value);
                }

                var entity = await Repository.GetAll()
                    //.AsNoTracking()
                    .Include(a => a.AgendamentoProcedimentos)
                    .Include(a => a.AgendamentoProdutos)
                    .Include(a => a.AgendamentoEquipamentoImagem)
                    .FirstOrDefaultAsync(a => a.Id == input.Id);


                entity.AgendamentoProcedimentos.Clear();
                entity.AgendamentoProdutos.Clear();
                entity.AgendamentoEquipamentoImagem.Clear();

                input.StatusAgendamento = StatusMachine(input);
                input = RegistraAuditoria(input);
                MapToEntity(input, entity);

                this.Repository.Update(entity);                
                //this.CurrentUnitOfWork.SaveChanges();                
                var dto = entity.MapTo<AgendamentoDto>();
                unitOfWork.Complete();
                return dto;
            }
                       
        }

        public override async Task<AgendamentoDto> Create(AgendamentoDto input)
        {
            CheckCreatePermission();
            if (input == null)
                throw new UserFriendlyException("Agendamento nulo");

            var conflitoMedico = this.ConflitoMedico(input);
            if (conflitoMedico.Key)
            {
                throw new UserFriendlyException(conflitoMedico.Value);
            }
            input.StatusAgendamento = StatusAgendamento.pre_agendado;
            input.StatusAgendamento = StatusMachine(input);
            input = RegistraAuditoria(input);
            return await base.Create(input);
        }

        private AgendamentoDto RegistraAuditoria(AgendamentoDto input)
        {
            if (input.Id == 0)
            {
                input.DataInclusao = DateTime.Now;
                input.UsuarioInclusao = this.AbpSession.UserId;
            }
            else
            {
                input.DataAlteracao = DateTime.Now;
                input.UsuarioAlteracao = this.AbpSession.UserId;
            }
            if (input.StatusAgendamento == StatusAgendamento.confirmado_parcial || input.StatusAgendamento == StatusAgendamento.confirmado)
            {
                input.DataConfirmacao = DateTime.Now;
            }
            return input;
        }

        public async Task ChangeTime(ChangeTimeDto changeTimeDto)
        {
            var agendamento = Repository.Get(changeTimeDto.Id);
            agendamento.ResourceId = changeTimeDto.ResourceId;


            if (changeTimeDto.Resize) //hora final foi arrastada. Entao muda hora fim
            {
                agendamento.End = agendamento.End.AddDays(changeTimeDto.DeltaDays)
                    .AddHours(changeTimeDto.DeltaHours).AddMinutes(changeTimeDto.DeltaMinutes);
            }
            else //evento foi arrastado.. entao muda inicio e fim do intervalo
            {
                agendamento.Start = agendamento.Start.AddDays(changeTimeDto.DeltaDays)
                    .AddHours(changeTimeDto.DeltaHours).AddMinutes(changeTimeDto.DeltaMinutes);

                agendamento.End = agendamento.End.AddDays(changeTimeDto.DeltaDays)
                    .AddHours(changeTimeDto.DeltaHours).AddMinutes(changeTimeDto.DeltaMinutes);
            }


            var agendamentoDto = agendamento.MapTo<AgendamentoDto>();
            //await Update(agendamentoDto);
            CheckUpdatePermission();
            var conflitoMedico = this.ConflitoMedico(agendamentoDto);
            if (conflitoMedico.Key)
            {
                throw new UserFriendlyException(conflitoMedico.Value);
            }

            agendamentoDto.StatusAgendamento = StatusMachine(agendamentoDto);
            agendamentoDto = RegistraAuditoria(agendamentoDto);
            MapToEntity(agendamentoDto, agendamento);

            this.Repository.Update(agendamento);
            this.CurrentUnitOfWork.SaveChanges();
        }

        public async Task<int> GetTotalAgendamentos()
        {           
            return await Repository.GetAll().CountAsync();
        }
    }
}
