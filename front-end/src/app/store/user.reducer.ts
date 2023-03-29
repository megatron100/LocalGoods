import * as UserAction from './user.actions';
import { User } from '../pages/auth/models/user.model';
import { CertificateModel } from '../pages/seller-admin-panel/models/certificate.model';

export interface UserState {
  user: User | null;
  certification: CertificateModel | null;
}

const initialState: UserState = {
  user: null,
  certification: null,
};

export function userReducer(
  state: UserState = initialState,
  { payload, type }: UserAction.UserActions
): UserState {
  switch (type) {
    case UserAction.CREATE_USER:
      return {
        ...state,
        user: payload,
      };
    case UserAction.UPDATE_USER: {
      const userData: {
        userId: string;
        email: string;
        role: string;
        nickName: string;
        _token: string;
        _refresh_token: string;
        _tokenExpirationDate: string;
        _refreshTokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData') || '{}');
      const updatedUser = new User(
        userData.userId,
        userData.email,
        userData.role,
        payload.basicInfo.name,
        userData._token,
        userData._refresh_token,
        new Date(userData._tokenExpirationDate),
        new Date(userData._refreshTokenExpirationDate),
        {
          pinCode: payload?.address.postCode,
          area: payload?.address?.area,
          city: payload?.address?.city,
          country: payload?.address?.country,
        },
        payload.basicInfo.mobile,
        {
          qualityCertificateTitle:
            payload?.basicInfo.certification.qualityCertificateTitle,
          qualityCertificateDescription:
            payload?.basicInfo.certification.qualityCertificateDescription,
          qualityCertificateLink:
            payload?.basicInfo.certification.qualityCertificateLink,
          taxNumber: payload?.basicInfo.certification.taxNumber,
        }
      );
      return {
        ...state,
        user: updatedUser,
      };
    }
    case UserAction.CREATE_CERTIFICATE:
      return {
        ...state,
        certification: payload,
      };
    default:
      return state;
  }
}
