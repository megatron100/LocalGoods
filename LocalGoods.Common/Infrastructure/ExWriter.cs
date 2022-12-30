namespace LocalGoods.Common.Infrastructure
{
    public class ExWriter
    {
        public static void Write(Exception exception)
        {
            try
            {

                using (StreamWriter sr = File.AppendText("ExceptionLogger.txt"))
                {

                    sr.WriteLine("=>" + DateTime.Now + " " + " An Error occurred: \n "+"StackTrace:  " +exception.StackTrace +
                        "\n Message: " + exception.Message + "\n\n");
                    sr.Flush();
                }
            }

            catch (Exception e)
            {
                throw;
            }

        }
    }
}
