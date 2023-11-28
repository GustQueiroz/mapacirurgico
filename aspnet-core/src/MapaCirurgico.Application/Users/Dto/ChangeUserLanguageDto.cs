using System.ComponentModel.DataAnnotations;

namespace MapaCirurgico.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}