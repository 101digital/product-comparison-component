import { StyleProp, ViewStyle, TextStyle } from 'react-native';
export type RecommandBannerComponentProps = {
  walletId: string;
  formatCurrency: (amount: number, code: string) => string;
  onTakeLook: () => void;
  gradientColors?: string[];
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
