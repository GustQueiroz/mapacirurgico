using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MapaCirurgico.CadastrosBasicos
{
    public class Procedimento : Entity<string>
    {
        [Required, StringLength(10)]
        public string Codigo { get; set; }

        [Required, StringLength(500)]
        public string Descricao { get; set; }
    }
}
