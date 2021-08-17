type ProductCompareClient = {
  mortgageClient: any;
};

export class ProductCompareService {
  private static _instance: ProductCompareService = new ProductCompareService();
  private _mortgageClient?: any;

  constructor() {
    if (ProductCompareService._instance) {
      throw new Error(
        'Error: Instantiation failed: Use ProductCompareService.getInstance() instead of new.'
      );
    }
    ProductCompareService._instance = this;
  }

  public static instance(): ProductCompareService {
    return ProductCompareService._instance;
  }

  public initClients = (clients: ProductCompareClient) => {
    this._mortgageClient = clients.mortgageClient;
  };

  compareProduct = async (
    bankID: number,
    loanAmount: number,
    loanTenure: number,
    productId?: string
  ) => {
    if (this._mortgageClient) {
      const response = await this._mortgageClient.get('products/compare', {
        params: {
          bankID,
          productId,
          productName: '5 year fixed rate Home Loan',
          productCategory: 'RESIDENTIAL_MORTGAGES',
          sort: 'rate-asc',
          lendingRateType: 'FIXED',
          repaymentType: 'PRINCIPAL_AND_INTEREST',
          loanAmount,
          loanTenure,
        },
      });
      return response.data;
    } else {
      throw new Error('Mortgage Client is not registered');
    }
  };
}
