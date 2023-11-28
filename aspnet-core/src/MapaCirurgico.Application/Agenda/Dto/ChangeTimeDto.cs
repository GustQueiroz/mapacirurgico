using System;
using System.Collections.Generic;
using System.Text;

namespace Dex.MapaCirurgico.Agenda.Dto
{
    public class ChangeTimeDto
    {
        public int Id { get; set; }
        public int ResourceId { get; set; }
        public int DeltaDays { get; set; }
        public int DeltaHours { get; set; }
        public int DeltaMinutes { get; set; }

        /// <summary>
        /// Tratamento quando for rezise é diferente quando for drag
        /// </summary>
        public bool Resize { get; set; }
    }
}
