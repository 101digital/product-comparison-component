import { RecommandBannerComponentStyle } from './types';
import { StyleSheet } from 'react-native';
import { defaultsDeep } from 'lodash';
import { useThemeFonts } from 'react-native-theme-component';

const useMergeStyle = (style?: RecommandBannerComponentStyle): RecommandBannerComponentStyle => {
  const fonts = useThemeFonts();
  const defaultStyles: RecommandBannerComponentStyle = StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 6,
      justifyContent: 'space-between',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    nextTextStyle: {
      fontFamily: fonts.bold,
      fontSize: 12,
      letterSpacing: -1,
      color: 'white',
      paddingHorizontal: 8,
      paddingTop: 8,
    },
    messageContainerStyle: {
      flex: 1,
    },
    messageTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 12,
      color: 'white',
      paddingHorizontal: 8,
      paddingTop: 8,
    },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyle;
