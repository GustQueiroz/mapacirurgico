using Abp.Domain.Entities;
using Dex.MapaCirurgico.CadastrosBasicos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Dex.MapaCirurgico.Agenda
{
    public class Medico : Entity
    {
        [Required, MaxLength(10)]
        public string Crm { get; set; }

        [Required, MaxLength(2)]
        public string UfConselho { get; set; }

        [Required, MaxLength(256)]
        public string Nome { get; set; }

        [MaxLength(500)]
        public string Endereco { get; set; }

        [Required, MaxLength(256)]
        public string Telefone { get; set; }

        [Required]
        public bool Anestesista { get; set; }

        [Required]
        public int EspecialidadeId { get; set; }
        
        public Especialidade Especialidade { get; set; }

        public List<MedicoEquipe> Equipes { get; set; }
    }
}
