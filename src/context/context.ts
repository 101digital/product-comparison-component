import { Comparision, CompasionRequestParams, Product, ProductCategory } from './../types';
import { ProductService } from '../services/product-service';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

export interface ProductContextData {
  comparisons: Comparision[];
  getComparisons: (params: CompasionRequestParams[]) => void;
  isLoadingComparisons: boolean;
  errorLoadComparison?: Error;
  clearComparisonErrors: () => void;
  clearComparisons: () => void;
  getComparisonByWalletId: (walletId: string) => Comparision | undefined;
}

export const productDefaultValue: ProductContextData = {
  comparisons: [],
  getComparisons: () => null,
  isLoadingComparisons: false,
  errorLoadComparison: undefined,
  clearComparisonErrors: () => null,
  clearComparisons: () => null,
  getComparisonByWalletId: () => undefined,
};

export const ProductContext = React.createContext<ProductContextData>(productDefaultValue);

export function useProductContextValue(): ProductContextData {
  const [_comparisons, setComparisons] = useState<Comparision[]>([]);
  const [_isLoadingComparisons, setLoadingComparison] = useState(false);
  const [_errorLoadComparisons, setErrorLoadComparisons] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (__DEV__) {
      console.log('PRODUCT_COMPARISON_DATA', JSON.stringify(_comparisons));
    }
  }, [_comparisons]);

  useEffect(() => {
    if (__DEV__ && _errorLoadComparisons) {
      console.log('PRODUCT_COMPARISON_ERROR', JSON.stringify(_errorLoadComparisons));
    }
  }, [_errorLoadComparisons]);

  const getComparisons = useCallback(async (params: CompasionRequestParams[]) => {
    setLoadingComparison(true);
    let _data: Comparision[] = [];
    for (const param of params) {
      try {
        const categoriesResp = await ProductService.instance().getProductCatefories(
          param.countryCode,
          param.productCategory
        );
        const category = (categoriesResp.data as ProductCategory[]).find(
          (c) => c.productCategory === param.productCategory
        );
        let period = 24; // default value
        if (category && category.contextualData) {
          period =
            category.contextualData.period.type === 'Months'
              ? category.contextualData.period.average
              : category.contextualData.period.average * 12;
        }
        const { data } = await ProductService.instance().productCompare(
          param.productId,
          param.amount,
          period,
          param.bankId,
          param.productCategory
        );
        const _currentProduct = data.find((p: Product) => p.currentProduct);
        let _nextProduct;
        if (param.productCategory === 'BUSINESS_LOANS') {
          _nextProduct = data.find(
            (p: Product) =>
              !p.currentProduct && p.productId === '965a7f64-167c-4b26-b8ab-06e90cdb3ff4'
          );
        } else {
          _nextProduct = data.find((p: Product) => !p.currentProduct);
        }
        if (
          _currentProduct &&
          _nextProduct &&
          _currentProduct.productId !== _nextProduct.productId
        ) {
          _data.push({
            walletId: param.walletId,
            accountSubtype: param.accountSubtype,
            amount: param.amount,
            period: period,
            products: [_currentProduct, _nextProduct],
          });
        }
        setComparisons(_data);
      } catch (error) {
        setErrorLoadComparisons(error);
      }
    }
    setLoadingComparison(false);
  }, []);

  const clearComparisonErrors = useCallback(() => {
    setErrorLoadComparisons(undefined);
  }, []);

  const clearComparisons = useCallback(() => {
    setComparisons([]);
  }, []);

  const getComparisonByWalletId = useCallback(
    (walletId: string) => {
      const comparison = _comparisons.find((c) => c.walletId === walletId);
      return comparison;
    },
    [_comparisons]
  );

  return useMemo(
    () => ({
      comparisons: _comparisons,
      isLoadingComparisons: _isLoadingComparisons,
      errorLoadComparison: _errorLoadComparisons,
      getComparisons,
      clearComparisonErrors,
      clearComparisons,
      getComparisonByWalletId,
    }),
    [_comparisons, _isLoadingComparisons, _errorLoadComparisons]
  );
}
