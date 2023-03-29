export interface SellerInfo {
  address: Address;
  basicInfo: BasicInfo;
}

interface Address {
  postCode: string;
  country: string;
  city: string;
  area: string;
}

interface BasicInfo {
  name: string;
  mobile: string;
  certification: Certification;
}

interface Certification {
  qualityCertificateTitle: string;
  qualityCertificateDescription: string;
  qualityCertificateLink: string;
  taxNumber: string;
}
