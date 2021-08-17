import { ProductCompareService } from '../services/product-service';
import { Product } from '../types';
import React, { useCallback, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';

export interface ProductCompareContextData {
  products: Product[];
  isLoadingProducts: boolean;
  errorLoadProduct?: Error;
  getProducts: (bankID: number, loanAmount: number, loanTenure: number, productId?: string) => void;
  clearProductErrors: () => void;
  clearProducts: () => void;
}

export const productDefaultValue: ProductCompareContextData = {
  products: [],
  isLoadingProducts: false,
  getProducts: () => null,
  errorLoadProduct: undefined,
  clearProductErrors: () => null,
  clearProducts: () => null,
};

export const ProductCompareContext =
  React.createContext<ProductCompareContextData>(productDefaultValue);

export function useProductContextValue(): ProductCompareContextData {
  const [_products, setProducts] = useState<Product[]>([]);
  const [_isLoadingProducts, setLoadingProducts] = useState(false);
  const [_errorLoadProducts, setErrorLoadProducts] = useState<Error | undefined>(undefined);

  const getProducts = useCallback(
    async (bankID: number, loanAmount: number, loanTenure: number, productId?: string) => {
      try {
        setLoadingProducts(true);
        const { data } = await ProductCompareService.instance().compareProduct(
          bankID,
          loanAmount,
          loanTenure,
          productId
        );
        setProducts(isEmpty(data) ? [] : [data[0], data[1]]);
        setLoadingProducts(false);
      } catch (error) {
        setLoadingProducts(false);
        setErrorLoadProducts(error);
      }
    },
    []
  );

  const clearProductErrors = useCallback(() => {
    setErrorLoadProducts(undefined);
  }, []);

  const clearProducts = useCallback(() => {
    setProducts([]);
  }, []);

  return useMemo(
    () => ({
      products: _products,
      isLoadingProducts: _isLoadingProducts,
      errorLoadProduct: _errorLoadProducts,
      getProducts,
      clearProductErrors,
      clearProducts,
    }),
    [_products, _isLoadingProducts, _errorLoadProducts, clearProducts]
  );
}
