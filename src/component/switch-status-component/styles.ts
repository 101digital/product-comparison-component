import { useThemeFonts } from 'react-native-theme-component';
import { RequestStatusComponentStyle } from './types';
import { StyleSheet } from 'react-native';
import { defaultsDeep } from 'lodash';

const useMergeStyle = (style?: RequestStatusComponentStyle): RequestStatusComponentStyle => {
  const fonts = useThemeFonts();

  const defaultStyle: RequestStatusComponentStyle = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: 'white',
    },
    contentContainerStyle: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      paddingVertical: 40,
      paddingHorizontal: 16,
    },
    titleTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 18,
      color: '#0d2050',
      marginBottom: 15,
      textAlign: 'center',
    },
    messageTextStyle: {
      marginTop: 15,
      textAlign: 'center',
      fontFamily: fonts.medium,
      fontSize: 14,
      color: '#0C3F79',
    },
    actionContainerStyle: {
      width: '100%',
      flexDirection: 'row',
      backgroundColor: 'white',
      shadowColor: 'grey',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: -10,
      },
      shadowRadius: 10,
      elevation: 5,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderTopWidth: 0.5,
      borderTopColor: '#E6E6E6',
    },
    iconContainerStyle: {
      marginVertical: 15,
    },
  });

  return defaultsDeep(style, defaultStyle);
};

export default useMergeStyle;
