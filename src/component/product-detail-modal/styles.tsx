import { StyleSheet } from 'react-native';
import { useThemeFonts } from 'react-native-theme-component';
import { ProductDetailModalStyles } from './types';
import { defaultsDeep } from 'lodash';

const useMergeStyle = (style?: ProductDetailModalStyles): ProductDetailModalStyles => {
  const fonts = useThemeFonts();

  const defaultStyles = StyleSheet.create({
    productNameTextStyle: {
      padding: 15,
      textAlign: 'center',
      fontFamily: fonts.medium,
      fontSize: 16,
      color: '#0C3F79',
    },
    actionNameTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 16,
      color: '#0d2050',
    },
    buttonContainerStyle: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyle;
