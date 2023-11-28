using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Quartz;
using MapaCirurgico.Authorization.Users;
using MapaCirurgico.CadastrosBasicos;
using MapaCirurgico.Mail;
using Microsoft.EntityFrameworkCore;
using Quartz;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MapaCirurgico.Jobs
{
    public class DataVencimentoProdutoJob : JobBase, ITransientDependency
    {       

        private readonly IRepository<Produto, int> _repositoryProduto;
        private readonly IRepository<ProdutoEmailEnviado, int> _repositoryProdutoEmailEnviado;        
        private readonly EnviarEmailService _enviarEmailService;
        private readonly UserManager _userManager;

        public DataVencimentoProdutoJob(IRepository<Produto, int> repositoryProduto
                                       , IRepository<ProdutoEmailEnviado, int> repositorioProdutoEmailEnviado
                                       , UserManager userManager)
        {
            _repositoryProduto = repositoryProduto;
            _repositoryProdutoEmailEnviado = repositorioProdutoEmailEnviado;
            _userManager = userManager;
        }

        public override Task Execute(IJobExecutionContext context)
        {
            EnviarEmailProdutoVencido();            
            return Task.CompletedTask;
        }

        [UnitOfWork]
        public virtual void EnviarEmailProdutoVencido()
        {
            DateTime dataLimite = DateTime.Now.AddDays(30);
            var produtosVencidos = _repositoryProduto.GetAll()
                                                     .AsNoTracking()
                                                     .Where(p => p.DataVencimentoAnvisa <= dataLimite)
                                                     .Include(p => p.Fornecedor)
                                                     .ToList();


            var produtosEmailEnviados = _repositoryProdutoEmailEnviado.GetAll()
                                                                            .AsNoTracking()
                                                                            .Where(p => produtosVencidos.Contains(p.Produto) && p.DataHoraEnvio <= dataLimite)
                                                                            .OrderByDescending(p => p.DataHoraEnvio)
                                                                            .GroupBy(p => p.Produto)
                                                                            .ToDictionary(p => p.Key, p => p.FirstOrDefault());


            foreach (var produtoVencido in produtosVencidos)
            {
                bool dispararEmail = false;
                ProdutoEmailEnviado emailEnviado = null;
                produtosEmailEnviados.TryGetValue(produtoVencido, out emailEnviado);
                if (emailEnviado == null)
                {
                    dispararEmail = true;
                }
                else if ((DateTime.Today - emailEnviado.DataHoraEnvio.Date).Days == 5 && produtoVencido.DataVencimentoAnvisa >= DateTime.Today.AddDays(15))
                {
                    dispararEmail = true;
                }
                else if (produtoVencido.DataVencimentoAnvisa <= DateTime.Today.AddDays(15))
                {
                    dispararEmail = true;
                }

                if (dispararEmail)
                {
                    
                    dispararEmail = false;
                    var listaDestinatarios = new List<KeyValuePair<string, string>>();
                    var admins = _userManager.GetUsersInRoleAsync("Admin").GetAwaiter().GetResult();
                    foreach (var admin in admins)
                    {
                        listaDestinatarios.Add(new KeyValuePair<string, string>(admin.EmailAddress, admin.Name));
                    }
                    listaDestinatarios.Add(new KeyValuePair<string, string>(produtoVencido.Fornecedor.Email, produtoVencido.Fornecedor.RazaoSocial));
                    var assunto = "Produto com data de vencimento ANVISA desatualizada";
                    var textoHtml = $"<strong>Atenção:</strong> Consta em nosso registro o produto {produtoVencido.CodigoTuss} - {produtoVencido.Nome} com data de vencimento da ANVISA desatualizada ({produtoVencido.DataVencimentoAnvisa.Value.ToString("dd/MM/yyyy")}).<br/>Favor providenciar a atualização em caráter de urgência!";
                    var response = new EnviarEmailService().EnviarMultipleEmail("douglas@dexsistemas.com.br", "Mapa Cirúrgico",
                                                                         listaDestinatarios, assunto, textoHtml);
                    if (response.Result.StatusCode == System.Net.HttpStatusCode.Accepted)
                    { 
                        var produtoEmailEnviado = new ProdutoEmailEnviado();
                        produtoEmailEnviado.DataHoraEnvio = DateTime.Now;
                        produtoEmailEnviado.ProdutoId = produtoVencido.Id;
                        _repositoryProdutoEmailEnviado.InsertOrUpdateAndGetId(produtoEmailEnviado);
                    }
                }

            }


        }

       
    }
}
