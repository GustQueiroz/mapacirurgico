using Abp.Domain.Entities;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Dex.MapaCirurgico.Agenda
{
    public class EquipeMedica : Entity
    {
        public EquipeMedica()
        {
            this.MedicosEquipes = new List<MedicoEquipe>();
        }

        [Required(ErrorMessage ="O nome da equipe é obrigatório"), MaxLength(256)]
        public string Nome { get; set; }

        [Required(ErrorMessage ="O médico lider é obrigatório") ]
        public int MedicoLiderId { get; set; }

        [ForeignKey("MedicoLiderId")]
        public Medico MedicoLider { get; set; }

        public virtual List<MedicoEquipe> MedicosEquipes { get; set; }
    }

    public class MedicoEquipe : Entity
    {        
        public int MedicoId { get; set; }        
        public Medico Medico { get; set; }

        
        public int EquipeId { get; set; }        
        public EquipeMedica Equipe { get; set; }

        public bool Anestesista { get; set; }
    }
}
