export interface CompasionRequestParams {
  walletId: string;
  productId: string;
  amount: number;
  bankId: string;
  productCategory: string;
  countryCode: string;
  sort?: string;
}
export interface Comparision {
  walletId: string;
  amount: number;
  period: number;
  products: Product[];
}
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

export interface ContextualData {
  amount: {
    average: number;
    max: number;
    min: number;
    steps: number;
  };
  period: {
    average: number;
    max: number;
    min: number;
    steps: number;
    type: string;
  };
}

export interface ProductCategory {
  contextualData: ContextualData;
  countryCode: string;
  id: string;
  lastUpdatedAt: string;
  productCategory: string;
  productCategoryName: string;
}
