import React from 'react';
import WebView from 'react-native-webview';

export type ProductDetailComponentProps = {
  url: string;
};

const ProductDetailComponent = (props: ProductDetailComponentProps) => {
  const { url } = props;

  return <WebView scalesPageToFit incognito startInLoadingState source={{ uri: url }} />;
};

export default ProductDetailComponent;
