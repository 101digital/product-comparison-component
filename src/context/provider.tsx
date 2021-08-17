import React, { ReactNode } from 'react';
import { ProductCompareContext, useProductContextValue } from './context';

export type ProductProviderProps = {
  children: ReactNode;
};

const ProductCompareProvider = (props: ProductProviderProps) => {
  const { children } = props;
  const productContextData = useProductContextValue();

  return (
    <ProductCompareContext.Provider value={productContextData}>
      {children}
    </ProductCompareContext.Provider>
  );
};

export default ProductCompareProvider;
