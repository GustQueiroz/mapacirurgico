using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using MapaCirurgico.Configuration;
using MapaCirurgico.Web;

namespace MapaCirurgico.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class MapaCirurgicoDbContextFactory : IDesignTimeDbContextFactory<MapaCirurgicoDbContext>
    {
        public MapaCirurgicoDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<MapaCirurgicoDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            MapaCirurgicoDbContextConfigurer.Configure(builder, configuration.GetConnectionString(MapaCirurgicoConsts.ConnectionStringName));

            return new MapaCirurgicoDbContext(builder.Options);
        }
    }
}
