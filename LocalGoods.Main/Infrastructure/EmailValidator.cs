namespace LocalGoods.Main.Infrastructure
{
    public class EmailValidator
    {
        public static bool Validate (string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }
    }
 