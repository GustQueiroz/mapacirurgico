using Abp.Domain.Entities;
using System.ComponentModel.DataAnnotations;

namespace MapaCirurgico.CadastrosBasicos
{
    public class Fornecedor : Entity
    {
        [StringLength(20)]
        public string CpfCnpj { get; set; }

        [Required, StringLength(500)]
        public string RazaoSocial { get; set; }

        [Required, StringLength(100)]
        public string Email { get; set; }
    }
}
