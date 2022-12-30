using LocalGoods.DAL;
using LocalGoods.Common.EfModels;
using Microsoft.EntityFrameworkCore;

namespace LocalGoods.DAL.Repository
{
    public class Repository<T> : IRepository<T> where T : BaseModel
    {

        private readonly DbSet<T> _dbSet;
        private readonly LocalGoodsDbContext _dbContext;

        public Repository(LocalGoodsDbContext dbContext)
        {
            _dbContext = dbContext; 
            _dbSet = _dbContext.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            //asnotracking giving error
            return _dbSet.ToList();

        }

        public T GetById(int id)
        {

            return _dbSet.Find(id);
        }

        public void Add(T entity)
        {
            _dbSet.Add(entity);

        }

        public void AddRange(IEnumerable<T> entities)
        {
            _dbSet.AddRange(entities);
        }

        public void Update(T entity)
        {
            _dbSet.Attach(entity);

            _dbSet.Update(entity);

        }

        public void UpdateRange(IEnumerable<T> entities)
        {

            _dbSet.UpdateRange(entities);
        }

        public void Delete(T entity)
        {
            //check if item exists in db
            if (_dbContext.Entry(entity).State == EntityState.Detached)
            {
                _dbSet.Attach(entity);
            }

            _dbSet.Remove(entity);
            
        }

        //delete by id
        public void DeleteById(int id)
        {
            var entity = _dbSet.Find(id);
            if (entity == null) return;
            Delete(entity);
        }

        public void DeleteRange(IEnumerable<T> entities)
        {

            _dbSet.RemoveRange(entities);
        }

        public async Task DeleteAsync(T entity)
        {
            if (_dbContext.Entry(entity).State == EntityState.Detached)
            {
                _dbSet.Attach(entity);
            }
            await Task.Run(() => _dbSet.Remove(entity));
        }

        public async Task DeleteRangeAsync(IEnumerable<T> entities)
        {
            await Task.Run(() => _dbSet.RemoveRange(entities));
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            return entity;
        }

        public async Task AddRangeAsync(IEnumerable<T> entities)
        {
            await _dbSet.AddRangeAsync(entities);
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T> UpdateAsync(T entity)
        {
            await Task.Run(() => _dbSet.Update(entity));
            return entity;
        }

        public async Task UpdateRangeAsync(IEnumerable<T> entities)
        {
            await Task.Run(() => _dbSet.UpdateRange(entities));
        }

    }
}
