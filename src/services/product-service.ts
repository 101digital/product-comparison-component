type ProductClient = {
  productClient: any;
};

export class ProductService {
  private static _instance: ProductService = new ProductService();
  private _productClient?: any;

  constructor() {
    if (ProductService._instance) {
      throw new Error(
        'Error: Instantiation failed: Use ProductCompareService.getInstance() instead of new.'
      );
    }
    ProductService._instance = this;
  }

  public static instance(): ProductService {
    return ProductService._instance;
  }

  public initClients = (clients: ProductClient) => {
    this._productClient = clients.productClient;
  };

  compareProduct = async (
    bankID: number,
    loanAmount: number,
    loanTenure: number,
    productId?: string
  ) => {
    if (this._productClient) {
      const response = await this._productClient.get('products/compare', {
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
      throw new Error('Product Client is not registered');
    }
  };
}
