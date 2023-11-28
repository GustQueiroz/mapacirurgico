using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Abp;
using Abp.Extensions;
using Abp.Notifications;
using Abp.Timing;
using MapaCirurgico.Controllers;
using Abp.Quartz;
using MapaCirurgico.Jobs;
using Quartz;

namespace MapaCirurgico.Web.Host.Controllers
{
    public class HomeController : MapaCirurgicoControllerBase
    {
        private readonly INotificationPublisher _notificationPublisher;
        private readonly IQuartzScheduleJobManager _jobManager;
        public HomeController(INotificationPublisher notificationPublisher, IQuartzScheduleJobManager jobManager)
        {
            _notificationPublisher = notificationPublisher;
            _jobManager = jobManager;
        }

        public IActionResult Index()
        {
            _ = ScheduleJob();
            return Redirect("/swagger");
        }

        /// <summary>
        /// This is a demo code to demonstrate sending notification to default tenant admin and host admin uers.
        /// Don't use this code in production !!!
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public async Task<ActionResult> TestNotification(string message = "")
        {
            if (message.IsNullOrEmpty())
            {
                message = "This is a test notification, created at " + Clock.Now;
            }

            var defaultTenantAdmin = new UserIdentifier(1, 2);
            var hostAdmin = new UserIdentifier(null, 1);

            await _notificationPublisher.PublishAsync(
                "App.SimpleMessage",
                new MessageNotificationData(message),
                severity: NotificationSeverity.Info,
                userIds: new[] { defaultTenantAdmin, hostAdmin }
            );

            return Content("Sent notification: " + message);
        }

        public async Task ScheduleJob()
        {
            await _jobManager.ScheduleAsync<DataVencimentoProdutoJob>(
                job =>
                {
                    job.WithIdentity("DataVencimentoProdutoJobIdentity", "MapaGroup")
                        .WithDescription("A job to verify date of the product.");
                },
                trigger =>
                {
                    trigger.StartNow()
                        .WithSimpleSchedule(schedule =>
                        {                            
                            schedule.RepeatForever()                            
                                .WithIntervalInHours(24)                                
                                .Build();
                        });
                });            
        }
    }
}
