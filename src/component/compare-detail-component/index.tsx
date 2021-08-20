import React, { useContext, useState } from 'react';
import { ProductContext } from '../../context';
import useMergeStyles from './styles';
import { CompareDetailComponentProps } from './types';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Button, ThemeContext, Image } from 'react-native-theme-component';
import { images } from '../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import ProductDetailModal from '../product-detail-modal';

const SwitchStatusComponent = (rootProps: CompareDetailComponentProps) => {
  const { props, style, detailModalStyle } = rootProps;
  const { getComparisonByWalletId } = useContext(ProductContext);
  const { i18n } = useContext(ThemeContext);
  const [showMore, setshowMore] = useState(false);

  const comparisons = getComparisonByWalletId(props.walletId);
  const products = comparisons?.products ?? [];

  const styles = useMergeStyles(style);

  if (products.length < 2) {
    return <View />;
  }

  const onTapShowMoreDetail = () => {
    setshowMore(!showMore);
  };

  const renderProductItem = (type: number, bankLogo: string, bankName: string) => {
    return (
      <>
        <Image
          resizeMode='contain'
          style={styles.bankImageStyle}
          fallbackImage={props?.defaultBankImage ?? images.bank}
          source={{ uri: bankLogo }}
        />
        <Text
          numberOfLines={2}
          style={type === 1 ? styles.firtsBankTextStyle : styles.secondBankTextStyle}
        >
          {`${bankName}\n`}
        </Text>
      </>
    );
  };

  const renderItemBenefit = (title: string, rate1: string, rate2: string) => {
    return (
      <>
        <Text style={styles.rateTypeTextStyle}>{title}</Text>
        <View style={styles.rateContainerStyle}>
          <Text style={styles.rateTextStyle}>{`${rate1}%`}</Text>
          <Text style={styles.nextTextStyle}>{'>>'}</Text>
          <Text style={styles.rateTextStyle}>{`${rate2}%`}</Text>
        </View>
      </>
    );
  };

  return (
    <>
      <View style={styles.containerStyle}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.contentContainerStyle}>
          <View style={styles.titleContainerStyle}>
            <Text style={styles.titleTextStyle}>
              {props.componentTitle ??
                i18n?.t('switch_save.lbl_switch_title') ??
                'Switch to save on your home loan'}
            </Text>
          </View>
          <View style={styles.inforContainerStyle}>
            <View style={styles.bankContainerStyle}>
              {renderProductItem(1, products[0].bankLogo, products[0].productName)}
            </View>
            <Text style={styles.nextTextStyle}>{'>>'}</Text>
            <LinearGradient
              style={styles.bankContainerStyle}
              colors={props.gradientColors ?? ['#1469b8', '#007ef2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              {products?.[1] && renderProductItem(2, products[1].bankLogo, products[1].productName)}
            </LinearGradient>
          </View>
          <View style={styles.benefitContainerStyle}>
            <Text style={styles.benefitTitleStyle}>
              {props.benefitTitle ?? i18n?.t('switch_save.lbl_benefits') ?? 'Benefits'}
            </Text>
            <View style={styles.benefitContentContainerStyle}>
              {renderItemBenefit(
                props.interestRateTitle ??
                  i18n?.t('switch_save.lbl_interest_rate') ??
                  'Interest rate',
                (parseFloat(products[0].rate) * 100).toFixed(2),
                (parseFloat(products[1].rate) * 100).toFixed(2)
              )}
              <View style={styles.rateSeparatorStyle} />
              {renderItemBenefit(
                props.comparisonRateTitle ??
                  i18n?.t('switch_save.lbl_comparison_rate') ??
                  'Comparison rate',
                (products[0].comparisonRate * 100).toFixed(2),
                (products[1].comparisonRate * 100).toFixed(2)
              )}
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.showDetailContainerStyle}
              onPress={onTapShowMoreDetail}
            >
              <Text style={styles.showDetailTextStyle}>
                {props.showDetailTitle ??
                  i18n?.t('switch_save.btn_show_detail') ??
                  'Show more Details >'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.requestContainerStyle}>
          <Button
            label={
              props.requestButtonTitle ??
              i18n?.t('switch_save.btn_request_switch') ??
              'Request Switch Now'
            }
            onPress={props.onSwitchPressed}
          />
        </View>
      </View>
      <ProductDetailModal
        isVisible={showMore}
        onClose={() => setshowMore(false)}
        productName={products[1].productName}
        actions={props.actions}
        style={detailModalStyle}
        onPressedItem={(action) => {
          setshowMore(false);
          props.onPressedAction?.(action);
        }}
      />
    </>
  );
};

export default SwitchStatusComponent;
