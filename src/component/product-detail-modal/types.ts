import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ProductDetailModalProps = {
  isVisible?: boolean;
  productName: string;
  actions: string[];
  onPressedItem: (type: string) => void;
  onClose: () => void;
  style?: ProductDetailModalStyles;
};

export type ProductDetailModalStyles = {
  productNameTextStyle?: StyleProp<TextStyle>;
  actionNameTextStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
};
