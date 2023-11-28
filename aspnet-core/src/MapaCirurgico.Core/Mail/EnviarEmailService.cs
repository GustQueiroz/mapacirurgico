using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MapaCirurgico.Mail
{    

    public class EnviarEmailService
    {
        private readonly string ApiKey = "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";

        public EnviarEmailService()
        {

        }

        public async Task<Response> EnviarSingleEmail(string emailRemetente
                                          , string nomeRemetente
                                          , string emailDestinatario
                                          , string nomeDestinatario
                                          , string assunto
                                          , string corpoEmailHtml)
        {            
            var client = new SendGridClient(this.ApiKey);
            var from = new EmailAddress(emailRemetente, nomeRemetente);
            var subject = assunto;
            var to = new EmailAddress(emailDestinatario, nomeDestinatario);
            var plainTextContent = "Plain Text Content";
            var htmlContent = corpoEmailHtml;
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
            return response;
        }


        public async Task<Response> EnviarMultipleEmail(string emailRemetente
                                          , string nomeRemetente
                                          , List<KeyValuePair<string, string>> emailsNomesDestinatarios
                                          , string assunto
                                          , string corpoEmailHtml)
        {
            var client = new SendGridClient(this.ApiKey);
            var from = new EmailAddress(emailRemetente, nomeRemetente);
            var subject = assunto;
            var tos = new List<EmailAddress>();
            foreach (var item in emailsNomesDestinatarios)
            {
                tos.Add(new EmailAddress(item.Key, item.Value));
            }            
            var plainTextContent = "Plain Text Content";
            var htmlContent = corpoEmailHtml;
            var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, tos, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
            return response;
        }
    }
}
