import React, { useContext } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ProductContext } from '../../context';
import { RecommandBannerComponentProps, RecommandBannerComponentStyle } from './types';
import { ThemeContext } from 'react-native-theme-component';
import useMergeStyles from './styles';

const RecommandBanner = (props: RecommandBannerComponentProps) => {
  const { gradientColors, onTakeLook, message, formatCurrency, style, walletId } = props;
  const { getComparisonByWalletId } = useContext(ProductContext);
  const { i18n } = useContext(ThemeContext);

  const comparisons = getComparisonByWalletId(walletId);
  const products = comparisons?.products ?? [];

  if (products.length < 2) {
    return <View />;
  }

  const styles: RecommandBannerComponentStyle = useMergeStyles(style);

  const _decorationLine = 'underline';

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onTakeLook}>
      <LinearGradient
        style={styles.containerStyle}
        colors={gradientColors ?? ['#1469b8', '#007ef2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.messageContainerStyle}>
          <Text style={styles.messageTextStyle}>
            {(
              message ??
              i18n?.t('switch_save.msg_switch_now') ??
              'You can save approximately %s per month by switching your mortgage to %d.'
            )
              .replace(
                '%s',
                formatCurrency(products[0].monthlyRepayment - products[1].monthlyRepayment)
              )
              .replace('%d', products[1]?.bankName || '')}{' '}
            <Text style={{ textDecorationLine: _decorationLine }}>
              {i18n?.t('switch_save.btn_take_look') ?? 'Take a look'}
            </Text>
          </Text>
        </View>

        <Text style={styles.nextTextStyle}>{'>>'}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default RecommandBanner;
