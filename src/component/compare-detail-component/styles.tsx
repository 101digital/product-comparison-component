import { defaultsDeep } from 'lodash';
import { StyleSheet } from 'react-native';
import { CompareDetailComponentStyles } from './types';
import { useThemeFonts, useThemeColors } from 'react-native-theme-component';

const useMergeStyles = (style?: CompareDetailComponentStyles): CompareDetailComponentStyles => {
  const fonts = useThemeFonts();
  const colors = useThemeColors();

  const defaultStyles: CompareDetailComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor: 'white',
    },
    contentContainerStyle: {
      flex: 1,
      marginTop: 10,
    },
    requestContainerStyle: {
      width: '100%',
      backgroundColor: 'white',
      shadowColor: 'grey',
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: -10,
      },
      shadowRadius: 10,
      elevation: 5,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderTopWidth: 0.5,
      borderTopColor: '#E6E6E6',
    },
    titleContainerStyle: {
      backgroundColor: '#E4F2FF',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      marginHorizontal: 15,
      marginTop: 8,
      paddingVertical: 24,
    },
    titleTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 16,
      color: 'black',
    },
    bankImageStyle: {
      width: '50%',
      height: 50,
    },
    firtsBankTextStyle: {
      paddingTop: 4,
      paddingHorizontal: 8,
      textAlign: 'center',
      color: '#094884',
      fontFamily: fonts.medium,
      fontSize: 12,
      height: 35,
    },
    secondBankTextStyle: {
      paddingTop: 4,
      paddingHorizontal: 8,
      textAlign: 'center',
      color: 'white',
      fontFamily: fonts.medium,
      fontSize: 12,
      height: 35,
    },
    bankContainerStyle: {
      flex: 1,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      backgroundColor: '#eaf5ff',
    },
    inforContainerStyle: {
      paddingTop: 5,
      paddingBottom: 10,
      paddingHorizontal: 15,
      backgroundColor: 'white',
      zIndex: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    nextTextStyle: {
      paddingHorizontal: 2,
      fontFamily: fonts.medium,
      fontSize: 15,
      letterSpacing: -3,
      color: colors.primaryColor,
    },
    benefitContainerStyle: {
      borderRadius: 8,
      borderWidth: 1,
      backgroundColor: 'white',
      marginVertical: 15,
      borderColor: '#DDDDDD',
      marginHorizontal: 15,
    },
    benefitTitleStyle: {
      paddingVertical: 8,
      textAlign: 'center',
      fontFamily: fonts.medium,
      fontSize: 16,
      color: '#0d2050',
    },
    benefitContentContainerStyle: {
      backgroundColor: '#E4F2FF',
      justifyContent: 'center',
      borderRadius: 8,
      paddingHorizontal: 25,
      paddingTop: 24,
      paddingBottom: 16,
    },
    rateTypeTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 16,
      color: '#0d2050',
    },
    rateContainerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 8,
    },
    rateTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 14,
      color: '#0d2050',
    },
    showDetailContainerStyle: {
      paddingVertical: 11,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      borderRadius: 8,
    },
    showDetailTextStyle: {
      fontFamily: fonts.medium,
      fontSize: 12,
      color: colors.primaryColor,
    },
    rateSeparatorStyle: {
      height: 10,
    },
  });
  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
