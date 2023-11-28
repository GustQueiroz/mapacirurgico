using Abp.Domain.Entities;
using Dex.MapaCirurgico.CadastrosBasicos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dex.MapaCirurgico.Agenda
{
    public class Paciente : Entity
    {
        [Required, MaxLength(256)]
        public string Nome { get; set; }

        [MaxLength(256)]
        public string CodigoCliente { get; set; }

        public bool Particular { get; set; }

        [Required, MaxLength(256)]
        public string Email { get; set; }

    }
}
