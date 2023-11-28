using Abp.Authorization;
using MapaCirurgico.Authorization.Roles;
using MapaCirurgico.Authorization.Users;

namespace MapaCirurgico.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
