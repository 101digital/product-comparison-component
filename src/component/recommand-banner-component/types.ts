import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export type RecommandBannerComponentProps = {
  formatCurrency: (amount: number, code: string) => string;
  gradientColors?: string[];
  onTakeLook: () => void;
  message?: string;
  style?: RecommandBannerComponentStyle;
};

export type RecommandBannerComponentStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  messageContainerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  nextTextStyle?: StyleProp<TextStyle>;
  takeLookTextStyle?: StyleProp<TextStyle>;
};
