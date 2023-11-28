using Abp.Domain.Entities;
using Dex.MapaCirurgico.Agenda;
using MapaCirurgico.CadastrosBasicos;

namespace MapaCirurgico.Agenda
{
    public class AgendamentoProduto : Entity
    {
        public int AgendamentoId { get; set; }
        public Agendamento Agendamento { get; set; }

        public int ProdutoId { get; set; }
        public Produto Produto { get; set; }

        public int Quantidade { get; set; }

        public bool Confirmado { get; set; }
    }
}
