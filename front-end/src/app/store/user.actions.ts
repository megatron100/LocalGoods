import {Action} from "@ngrx/store";
import {User} from "../pages/auth/models/user.model";
import {CertificateModel} from "../pages/seller-admin-panel/models/certificate.model";
import {SellerInfo} from "../core";

export const CREATE_USER = 'CREATE_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const CREATE_CERTIFICATE = 'CREATE_CERTIFICATE';

export class CreateUser implements Action{
  readonly type = CREATE_USER;

  constructor(public payload: User | null) {
  }
}

export class UpdateUser implements Action{
  readonly type = UPDATE_USER;

  constructor(public payload: SellerInfo) {
  }
}

export class CreateCertificate implements Action{
  readonly type = CREATE_CERTIFICATE;

  constructor(public payload: CertificateModel | null) {
  }
}


export type UserActions = CreateUser | UpdateUser | CreateCertificate
