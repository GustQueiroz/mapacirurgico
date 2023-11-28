using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Dex.MapaCirurgico.Agenda
{
    public class Recurso : Entity
    {
        [Required, MaxLength(256)]
        public string Title { get; set; }

        [MaxLength(10)]
        public string EventColor { get; set; }
    }
}
