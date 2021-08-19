import { Comparision, CompasionRequestParams, Product, ProductCategory } from './../types';
import { ProductService } from '../services/product-service';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';

export interface ProductContextData {
  comparisons: Comparision[];
  getComparisons: (params: CompasionRequestParams[]) => void;
  isLoadingComparisons: boolean;
  errorLoadComparison?: Error;
  clearComparisonErrors: () => void;
  clearComparisons: () => void;
  getProductsByWalletId: (walletId: string) => Product[];
}

export const productDefaultValue: ProductContextData = {
  comparisons: [],
  getComparisons: () => null,
  isLoadingComparisons: false,
  errorLoadComparison: undefined,
  clearComparisonErrors: () => null,
  clearComparisons: () => null,
  getProductsByWalletId: () => [],
};

export const ProductContext = React.createContext<ProductContextData>(productDefaultValue);

export function useProductContextValue(): ProductContextData {
  const [_comparisons, setComparisons] = useState<Comparision[]>([]);
  const [_isLoadingComparisons, setLoadingComparison] = useState(false);
  const [_errorLoadComparisons, setErrorLoadComparisons] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (__DEV__) {
      console.log('PRODUCT_COMPARISON_DATA', _comparisons);
    }
  }, [_comparisons]);

  useEffect(() => {
    if (__DEV__ && _errorLoadComparisons) {
      console.log('PRODUCT_COMPARISON_ERROR', _errorLoadComparisons);
    }
  }, [_errorLoadComparisons]);

  const getComparisons = useCallback(
    async (params: CompasionRequestParams[]) => {
      try {
        setLoadingComparison(true);
        for (const param of params) {
          const categoriesResp = await ProductService.instance().getProductCatefories(
            param.countryCode,
            param.productCategory
          );
          const category = (categoriesResp.data as ProductCategory[]).find(
            (c) => c.productCategory === param.productCategory
          );
          let period = 0;
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
          setComparisons([..._comparisons, { walletId: param.walletId, products: data }]);
        }
        setLoadingComparison(false);
      } catch (error) {
        setLoadingComparison(false);
        setErrorLoadComparisons(error);
      }
    },
    [_comparisons]
  );

  const clearComparisonErrors = useCallback(() => {
    setErrorLoadComparisons(undefined);
  }, []);

  const clearComparisons = useCallback(() => {
    setComparisons([]);
  }, []);

  const getProductsByWalletId = useCallback(
    (walletId: string) => {
      const comparison = _comparisons.find((c) => c.walletId === walletId);
      if (comparison) {
        return comparison.products;
      }
      return [];
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
      getProductsByWalletId,
    }),
    [_comparisons, _isLoadingComparisons, _errorLoadComparisons]
  );
}
