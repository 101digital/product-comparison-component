import React, { ReactNode } from 'react';
import { ProductContext, useProductContextValue } from './context';

export type ProductProviderProps = {
  children: ReactNode;
};

const ProductProvider = (props: ProductProviderProps) => {
  const { children } = props;
  const productContextData = useProductContextValue();

  return <ProductContext.Provider value={productContextData}>{children}</ProductContext.Provider>;
};

export default ProductProvider;
