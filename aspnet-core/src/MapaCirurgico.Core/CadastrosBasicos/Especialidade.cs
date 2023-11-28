using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dex.MapaCirurgico.CadastrosBasicos
{
    public class Especialidade : Entity
    {
        [Required, MaxLength(256)]
        public string Nome { get; set; }
    }
}
