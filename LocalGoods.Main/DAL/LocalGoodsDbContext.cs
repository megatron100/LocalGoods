using LocalGoods.Main.Model;
using Microsoft.EntityFrameworkCore;

namespace LocalGoods.Main.DAL
{
    public class LocalGoodsDbContext:DbContext
    {
        public LocalGoodsDbContext(DbContextOptions options) : base(options)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionBuilder)
        {
            optionBuilder.UseLazyLoadingProxies();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
             
        }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<CardDetail> CardDetails { get; set; }
        public DbSet<Rating> Rating { get; set; }
        public DbSet<Seller> Seller { get; set; }
        //public DbSet<Certificate> Certificate { get; set; }
        public DbSet<ProductCategory> ProductCategory { get; set; }




    }
}
