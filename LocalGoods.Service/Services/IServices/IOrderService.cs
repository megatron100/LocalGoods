using LocalGoods.Common.EfModels;

namespace LocalGoods.Service.Services.IServices
{
    public interface IOrderService
    {
        //take reference from OrderController

        public Task<List<Order>> GetOrders();
        public Task<Order> GetOrderById(int orderId);
        public Task<Order> GetOrderByProductId(int productId);

        public Task<bool> AddOrder(Order order);
        public Task<bool> UpdateOrder(Order order);
        public Task<bool> DeleteOrder(int orderId);

        public Task<bool> OrderFromCart();

        //admin related methods
        public Task<bool> AdminGetAllOrders();
        public Task<bool> AdminGetAllOrdersByStatus(string OrderStatus);
        public Task<bool> AdminPlaceOrderForUser(int userId, int productId, int quantity);
        public Task<bool> AdminMarkOrderDelivered(int orderId);
        public Task<bool> AdminMarkOrderCancelled(int orderId);
        public Task<bool> AdminMarkOrderReturned(int orderId);
        public Task<bool> AdminMarkOrderRefunded(int orderId);

    }
}
