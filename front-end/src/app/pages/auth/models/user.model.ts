import {UserPaymentCardModel} from "./user-payment-card.model";

export class User {
  constructor(
    public data: {
        address: {
          pinCode: string,
          country: string,
          city: string,
          area: string,
          coordinates: string,
          createdDate: string
        },
      cardList: UserPaymentCardModel[],
      certification:[],
      email: string,
      name: string,
      mobile: string,
      role: string,
      sellerRating: number
    },
    private _token: string,
    private _refresh_token: string,
    private _tokenExpirationDate: Date,
    private _refreshTokenExpirationDate: Date
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
