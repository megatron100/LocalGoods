using LocalGoods.Common.EfModels;

namespace LocalGoods.Service.Services.IServices
{
    public interface IPaymentService
    {
        //take idea from CardController
        public Task<Dictionary<bool, string>> PayWithCard(int cardId, decimal amount);
        public Task<Dictionary<bool, string>> PayWithUPI(string upiId, decimal amount);

        public Task<CardDetail> GetCard();
        public Task<bool> AddCard(string CardNumber, string CardProvider, string Expiry);
        public Task<bool> UpdateCard(CardDetail card);
        public Task<bool> DeleteCard(int cardId);

    }
}
