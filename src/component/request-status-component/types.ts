import { StyleProp, ViewStyle, TextStyle } from 'react-native';
import { ReactNode } from 'react';

export enum RequestStatus {
  success = 'Success',
  failed = 'Failed',
}

export type RequestStatusComponentStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  actionContainerStyle?: StyleProp<ViewStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
};

export type RequestStatusComponentProps = {
  status: RequestStatus;
  title?: string;
  message?: string;
  successIcon?: ReactNode;
  failedIcon?: ReactNode;
  style?: RequestStatusComponentStyle;
  confirmTitle?: string;
  onConfirmed: () => void;
};
