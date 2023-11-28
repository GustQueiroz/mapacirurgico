using Abp.EntityFrameworkCore.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.EntityFrameworkCore;
using MapaCirurgico.EntityFrameworkCore.Seed;

namespace MapaCirurgico.EntityFrameworkCore
{
    [DependsOn(
        typeof(MapaCirurgicoCoreModule), 
        typeof(AbpZeroCoreEntityFrameworkCoreModule))]
    public class MapaCirurgicoEntityFrameworkModule : AbpModule
    {
        /* Used it tests to skip dbcontext registration, in order to use in-memory database of EF Core */
        public bool SkipDbContextRegistration { get; set; }

        public bool SkipDbSeed { get; set; }

        public override void PreInitialize()
        {
            if (!SkipDbContextRegistration)
            {
                Configuration.Modules.AbpEfCore().AddDbContext<MapaCirurgicoDbContext>(options =>
                {
                    if (options.ExistingConnection != null)
                    {
                        MapaCirurgicoDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);
                    }
                    else
                    {
                        MapaCirurgicoDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
                    }
                });
            }
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(MapaCirurgicoEntityFrameworkModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            if (!SkipDbSeed)
            {
                SeedHelper.SeedHostDb(IocManager);
            }
        }
    }
}
