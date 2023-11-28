using Microsoft.AspNetCore.Antiforgery;
using MapaCirurgico.Controllers;

namespace MapaCirurgico.Web.Host.Controllers
{
    public class AntiForgeryController : MapaCirurgicoControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
