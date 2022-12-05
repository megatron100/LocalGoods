import {UserPaymentCardModel} from "./user-payment-card.model";

export class User {
  constructor(
    public userId: string,
    public email: string,
    public role: string,
    public nickName: string,
    private _token: string,
    private _refresh_token: string,
    private _tokenExpirationDate: Date,
    private _refreshTokenExpirationDate: Date,
    public cardList?: UserPaymentCardModel[],
    public certification?: [],
    public name?: string,
    public mobile?: string,
    public sellerRating?: number,
    public address?: {
      pinCode: string,
      country: string,
      city: string,
      area: string,
      coordinates: string,
      createdDate: string
    },
  ) {
  }

//if the token is valid, return it if not, null
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._refreshTokenExpirationDate) {
      return null
    } else if (new Date() > this._tokenExpirationDate && new Date() < this._refreshTokenExpirationDate) {
      return this._refresh_token
    }
    return this._token
  }
}
