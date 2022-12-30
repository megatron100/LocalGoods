using LocalGoods.Common.EfModels;
using LocalGoods.Service.Services.IServices;

namespace LocalGoods.Service.Services
{
    public class PaymentService : IPaymentService
    {
        public Task<bool> AddCard(string CardNumber, string CardProvider, string Expiry)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteCard(int cardId)
        {
            throw new NotImplementedException();
        }

        public Task<CardDetail> GetCard()
        {
            throw new NotImplementedException();
        }

        public Task<Dictionary<bool, string>> PayWithCard(int cardId, decimal amount)
        {
            throw new NotImplementedException();
        }

        public Task<Dictionary<bool, string>> PayWithUPI(string upiId, decimal amount)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateCard(CardDetail card)
        {
            throw new NotImplementedException();
        }
    }
}
