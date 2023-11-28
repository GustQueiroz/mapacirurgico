using Microsoft.Extensions.Configuration;
using Castle.MicroKernel.Registration;
using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using MapaCirurgico.Configuration;
using MapaCirurgico.EntityFrameworkCore;
using MapaCirurgico.Migrator.DependencyInjection;

namespace MapaCirurgico.Migrator
{
    [DependsOn(typeof(MapaCirurgicoEntityFrameworkModule))]
    public class MapaCirurgicoMigratorModule : AbpModule
    {
        private readonly IConfigurationRoot _appConfiguration;

        public MapaCirurgicoMigratorModule(MapaCirurgicoEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

            _appConfiguration = AppConfigurations.Get(
                typeof(MapaCirurgicoMigratorModule).GetAssembly().GetDirectoryPathOrNull()
            );
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                MapaCirurgicoConsts.ConnectionStringName
            );

            Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
            Configuration.ReplaceService(
                typeof(IEventBus), 
                () => IocManager.IocContainer.Register(
                    Component.For<IEventBus>().Instance(NullEventBus.Instance)
                )
            );
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(MapaCirurgicoMigratorModule).GetAssembly());
            ServiceCollectionRegistrar.Register(IocManager);
        }
    }
}
