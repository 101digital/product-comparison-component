import React from 'react';
import { View, Text } from 'react-native';
import useMergeStyles from './styles';
import { Button } from 'react-native-theme-component';
import { SuccessIcon, FailedIcon } from '../../assets/images';
import { SwitchStatusComponentProps, SwitchStatusComponentStyle, RequestStatus } from './types';

const SwitchStatusComponent = (props: SwitchStatusComponentProps) => {
  const {
    i18n,
    status,
    style,
    successIcon,
    failedIcon,
    message,
    title,
    onConfirmed,
    confirmTitle,
  } = props;
  const styles: SwitchStatusComponentStyle = useMergeStyles(style);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.contentContainerStyle}>
        <Text style={styles.titleTextStyle}>
          {title ??
            i18n?.t('product_comparison_component.msg_congratulations') ??
            'Congratulations!\nSwicth & Save Request Successful'}
        </Text>
        <View style={styles.iconContainerStyle}>
          {status === RequestStatus.success
            ? successIcon ?? <SuccessIcon size={60} color='#17bb6b' />
            : failedIcon ?? <FailedIcon size={60} color='red' />}
        </View>
        <Text style={styles.messageTextStyle}>
          {message ??
            i18n?.t('product_comparison_component.msg_switch_successful') ??
            'Your switch request has been submitted successfully. We will be in touch with you shortly.'}
        </Text>
      </View>
      <View style={styles.actionContainerStyle}>
        <Button
          style={{
            primaryContainerStyle: {
              flex: 1,
            },
          }}
          label={confirmTitle ?? i18n?.t('product_comparison_component.btn_confirm_status') ?? 'Ok'}
          onPress={onConfirmed}
        />
      </View>
    </View>
  );
};

export default SwitchStatusComponent;
