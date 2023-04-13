export interface ProductData {
  otherProducts: IProduct[];
}

export interface IProduct {
  productTitle: string;
  seller: User;
  productCategory: ProductCategory;
  price: number;
  shortDescription: string;
  longDescription: string;
  imageLink: string;
  deleteImageLink?: string;
  isPublished: boolean;
  isAvailable: boolean;
  id: number;
}

export interface User {
  email: string;
  name: string;
  mobile: string;
  address: Address;
  card?: string;
  role: string;
  certification: Certification;
  sellerRating: number;
  id: number;
}

export interface Address {
  pinCode: string;
  country: string;
  city: string;
  area: string;
  cordinates?: string;
  id: number;
}

export interface Certification {
  qualityCertificateTitle: string;
  qualityCertificateDescription: string;
  qualityCertificateLink: string;
  qualityCertificateDeleteLink?: string;
  taxNumber: string;
  id: number;
}

export interface ProductCategory {
  productCategoryName: string;
  id: number;
}
