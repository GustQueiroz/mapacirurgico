using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MapaCirurgico.CadastrosBasicos
{
    public class EquipamentoImagem : Entity<int>
    {
        [Required(ErrorMessage ="Nome do equipamento de imagem é obrigatório."), MaxLength(256)]
        public string Nome { get; set; }
    }
}
