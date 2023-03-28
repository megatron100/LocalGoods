import {UserPaymentCardModel} from "./user-payment-card.model";

export class User {
  constructor(
    public userId: string,
    public email: string,
    public role: string,
    public nickName: string,
    public _token: string,
    public _refresh_token: string,
    public _tokenExpirationDate: Date,
    public _refreshTokenExpirationDate: Date,
    public address?: {
      pinCode?: string,
      country?: string,
      city?: string,
      area?: string,
      coordinates?: string,
      createdDate?: string
    },
    public mobile?: string,
    public certification?: {
      qualityCertificateTitle: string,
      qualityCertificateDescription: string,
      qualityCertificateLink: string,
      taxNumber: string,
    } | null,
    public sellerRating?: number,
    public cardList?: UserPaymentCardModel[],
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
