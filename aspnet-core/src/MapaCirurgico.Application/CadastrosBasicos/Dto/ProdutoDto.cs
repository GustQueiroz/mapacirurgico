using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MapaCirurgico.CadastrosBasicos.Dto
{
    [AutoMapFrom(typeof(Produto)), AutoMapTo(typeof(Produto))]
    public class ProdutoDto : EntityDto<int>
    {
        [Required(ErrorMessage ="O Código Tuss é obrigatório"), MaxLength(8)]
        public string CodigoTuss { get; set; }

        [Required(ErrorMessage = "O Nome do produto é obrigatório"), MaxLength(500)]
        public string Nome { get; set; }

        [MaxLength(100)]
        public string ReferenciaFabricante { get; set; }

        [MaxLength(100)]
        public string NumeroRegistroAnvisa { get; set; }

        public DateTime? DataVencimentoAnvisa { get; set; }

        public int QuantidadeEstoque { get; set; }

        public int FornecedorId { get; set; }

        public string FornecedorRazaoSocial { get; set; }
    }
}
