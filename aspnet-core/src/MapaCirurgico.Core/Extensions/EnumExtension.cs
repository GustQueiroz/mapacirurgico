﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;

namespace MapaCirurgico.Extensions
{
    public static class EnumExtension
    {
        public static string GetDescription(this Enum value)
        {
            return
                value
                    .GetType()
                    .GetMember(value.ToString())
                    .FirstOrDefault()
                    ?.GetCustomAttribute<DescriptionAttribute>()
                    ?.Description;
        }
    }
}
