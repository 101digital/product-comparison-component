import { StyleProp, ViewStyle, TextStyle, ImageStyle, ImageURISource } from 'react-native';
import { ProductDetailModalStyles } from '../product-detail-modal/types';

export type CompareDetailComponentProps = {
  props: {
    onSwitchPressed: () => void;
    gradientColors?: string[];
    actions: string[];
    onPressedAction?: (name: string) => void;
    componentTitle?: string;
    benefitTitle?: string;
    interestRateTitle?: string;
    comparisonRateTitle?: string;
    showDetailTitle?: string;
    requestButtonTitle?: string;
    defaultBankImage?: ImageURISource;
  };
  style?: CompareDetailComponentStyles;
  detailModalStyle?: ProductDetailModalStyles;
};

export type CompareDetailComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  requestContainerStyle?: StyleProp<ViewStyle>;
  titleContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  inforContainerStyle?: StyleProp<ViewStyle>;
  bankContainerStyle?: StyleProp<ViewStyle>;
  bankImageStyle?: StyleProp<ImageStyle>;
  firtsBankTextStyle?: StyleProp<TextStyle>;
  secondBankTextStyle?: StyleProp<TextStyle>;
  nextTextStyle?: StyleProp<TextStyle>;
  benefitContainerStyle?: StyleProp<ViewStyle>;
  benefitTitleStyle?: StyleProp<TextStyle>;
  benefitContentContainerStyle?: StyleProp<ViewStyle>;
  rateTypeTextStyle?: StyleProp<TextStyle>;
  rateContainerStyle?: StyleProp<ViewStyle>;
  rateTextStyle?: StyleProp<TextStyle>;
  showDetailContainerStyle?: StyleProp<ViewStyle>;
  showDetailTextStyle?: StyleProp<TextStyle>;
  rateSeparatorStyle?: StyleProp<ViewStyle>;
};
