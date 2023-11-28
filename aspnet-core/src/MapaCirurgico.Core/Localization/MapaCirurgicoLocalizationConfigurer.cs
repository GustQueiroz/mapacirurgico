using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace MapaCirurgico.Localization
{
    public static class MapaCirurgicoLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(MapaCirurgicoConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(MapaCirurgicoLocalizationConfigurer).GetAssembly(),
                        "MapaCirurgico.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
