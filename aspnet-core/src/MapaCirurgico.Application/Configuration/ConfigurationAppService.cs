using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using MapaCirurgico.Configuration.Dto;

namespace MapaCirurgico.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : MapaCirurgicoAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
