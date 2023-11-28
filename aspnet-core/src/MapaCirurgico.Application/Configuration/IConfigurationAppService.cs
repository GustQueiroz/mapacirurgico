using System.Threading.Tasks;
using MapaCirurgico.Configuration.Dto;

namespace MapaCirurgico.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
