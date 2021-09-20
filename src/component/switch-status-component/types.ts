import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ReactNode } from 'react';

export enum RequestStatus {
  success = 'Success',
  failed = 'Failed',
}

export type SwitchStatusComponentStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  actionContainerStyle?: StyleProp<ViewStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
};

export type SwitchStatusComponentProps = {
  i18n?: any;
  status: RequestStatus;
  title?: string;
  message?: string;
  successIcon?: ReactNode;
  failedIcon?: ReactNode;
  style?: SwitchStatusComponentStyle;
  confirmTitle?: string;
  onConfirmed: () => void;
};
