using Abp.Domain.Entities;
using MapaCirurgico.CadastrosBasicos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MapaCirurgico.Mail
{
    public class ProdutoEmailEnviado : Entity
    {
        [Required]
        public int ProdutoId { get; set; }

        public Produto Produto { get; set; }

        public DateTime DataHoraEnvio { get; set; }
               
    }
}
