type ProductClient = {
  productClient: any;
};

export class ProductService {
  private static _instance: ProductService = new ProductService();
  private _productClient?: any;

  constructor() {
    if (ProductService._instance) {
      throw new Error(
        'Error: Instantiation failed: Use ProductService.getInstance() instead of new.'
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

  productCompare = async (
    productId: string,
    amount: number,
    loanPeriod: number,
    bankId: string,
    productCategory: string,
    sort?: string
  ) => {
    if (this._productClient) {
      const response = await this._productClient.get(`products/${productId}/compare`, {
        params: {
          amount,
          loanPeriod,
          bankId,
          productCategory,
          sort: sort ?? 'RATE_ASC',
          pageSize: 100,
          pageNumber: 1,
        },
      });
      return response.data;
    } else {
      throw new Error('Product Client is not registered');
    }
  };

  getProductCatefories = async (countryCode: string, internalProductCategory: string) => {
    if (this._productClient) {
      const response = await this._productClient.get(`product-categories`, {
        params: {
          countryCode,
          internalProductCategory,
        },
      });
      return response.data;
    } else {
      throw new Error('Product Client is not registered');
    }
  };
}
