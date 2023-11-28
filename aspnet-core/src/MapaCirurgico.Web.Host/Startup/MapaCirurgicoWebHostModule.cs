using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using MapaCirurgico.Configuration;
using Abp.Quartz;

namespace MapaCirurgico.Web.Host.Startup
{
    [DependsOn(
       typeof(MapaCirurgicoWebCoreModule))]
    public class MapaCirurgicoWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public MapaCirurgicoWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(MapaCirurgicoWebHostModule).GetAssembly());
        }
    }
}
