export interface Product {
  bankID: number;
  bankName: string;
  productId: string;
  accountName: string;
  rate: string;
  productUrl: string;
  currentProduct: boolean;
  comparisonRate: number;
  productName: string;
  bankLogo: string;
  eligibiltyURL: string;
  feeAndPricingURL: string;
  termsURL: string;
  lendingRateType: string;
  productCategory: string;
  overviewURL: string;
  monthlyRepayment: number;
}

export enum Accounts {
  productTarget = '6870872',
}
