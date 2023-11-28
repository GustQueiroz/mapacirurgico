using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using MapaCirurgico.CadastrosBasicos;
using System;
using System.Collections.Generic;
using System.Text;

namespace MapaCirurgico.Agenda.Dto
{
    [AutoMapFrom(typeof(AgendamentoProduto)), AutoMapTo(typeof(AgendamentoProduto))]
    public class AgendamentoProdutoDto 
    {
        public int AgendamentoId { get; set; }        

        public int ProdutoId { get; set; }

        public string ProdutoCodigoTuss { get; set; }

        public string ProdutoNome { get; set; }

        public int ProdutoQuantidadeEstoque { get; set; }

        public int Quantidade { get; set; }

        public bool Confirmado { get; set; }
    }
}
