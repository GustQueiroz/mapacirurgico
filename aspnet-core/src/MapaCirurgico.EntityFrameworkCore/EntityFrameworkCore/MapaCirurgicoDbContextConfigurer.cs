using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace MapaCirurgico.EntityFrameworkCore
{
    public static class MapaCirurgicoDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<MapaCirurgicoDbContext> builder, string connectionString)
        {
            builder.UseMySql(connectionString);
            //builder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        }

        public static void Configure(DbContextOptionsBuilder<MapaCirurgicoDbContext> builder, DbConnection connection)
        {
            builder.UseMySql(connection);
            //builder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            
        }
    }
}
