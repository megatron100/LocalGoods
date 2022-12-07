export interface UserUpdateResponseData {
  data: {
    "address": {
      "pinCode": string,
      "country": string,
      "city": string,
      "area": string,
    },
    "card": null,
    "certification": {
      "qualityCertificateTitle": string,
      "qualityCertificateDescription": string,
      "qualityCertificateLink": string,
      "qualityCertificateDeleteLink": string,
      "taxNumber": string,
      "id": number
    },
    "email": string,
    "name": string,
    "mobile": string,
    "role": string,
    "sellerRating": number,
    "id": number
  }
}
