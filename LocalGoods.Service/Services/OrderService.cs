using LocalGoods.Common.EfModels;
using LocalGoods.Service.Services.IServices;

namespace LocalGoods.Service.Services
{
    public class OrderService : IOrderService
    {
        public Task<bool> AddOrder(Order order)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AdminGetAllOrders()
        {
            throw new NotImplementedException();
        }

        public Task<bool> AdminGetAllOrdersByStatus(string OrderStatus)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AdminMarkOrderCancelled(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AdminMarkOrderDelivered(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AdminMarkOrderRefunded(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AdminMarkOrderReturned(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> AdminPlaceOrderForUser(int userId, int productId, int quantity)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteOrder(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<Order> GetOrderById(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<Order> GetOrderByProductId(int productId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Order>> GetOrders()
        {
            throw new NotImplementedException();
        }

        public Task<bool> OrderFromCart()
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateOrder(Order order)
        {
            throw new NotImplementedException();
        }
    }
}
