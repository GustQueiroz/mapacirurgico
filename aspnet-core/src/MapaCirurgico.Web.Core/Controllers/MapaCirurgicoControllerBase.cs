using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace MapaCirurgico.Controllers
{
    public abstract class MapaCirurgicoControllerBase: AbpController
    {
        protected MapaCirurgicoControllerBase()
        {
            LocalizationSourceName = MapaCirurgicoConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
