using Abp.AutoMapper;
using Abp.Modules;
using Abp.Quartz;
using Abp.Reflection.Extensions;
using MapaCirurgico.Authorization;

namespace MapaCirurgico
{
    [DependsOn(
        typeof(MapaCirurgicoCoreModule), 
        typeof(AbpAutoMapperModule),
        typeof(AbpQuartzModule))]
    public class MapaCirurgicoApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<MapaCirurgicoAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(MapaCirurgicoApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );
        }
    }
}
