using Abp.Domain.Entities;
using System;
using System.ComponentModel.DataAnnotations;

namespace MapaCirurgico.CadastrosBasicos
{
    public class Produto : Entity
    {
        [Required, StringLength(8)]
        public string CodigoTuss { get; set; }

        [Required, StringLength(500)]
        public string Nome { get; set; }

        [StringLength(100)]
        public string ReferenciaFabricante { get; set; }

        [StringLength(100)]
        public string NumeroRegistroAnvisa { get; set; }

        public DateTime? DataVencimentoAnvisa { get; set; }

        public int QuantidadeEstoque { get; set; }

        public int FornecedorId { get; set; }

        public Fornecedor Fornecedor { get; set; }
    }
}
