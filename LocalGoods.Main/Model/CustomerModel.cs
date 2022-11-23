namespace LocalGoods.Main.Model
{
    public class Customer :BaseModel
    {
  
        public string Email { get; set; }   
        public string Password { get; set; }

        public string Name { get; set; }

        public virtual Address Address { get; set; }

        public virtual CardDetail CardDetail { get; set; }

        public int Role { get; set; }






    }
}
