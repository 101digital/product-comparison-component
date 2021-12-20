import React from 'react';
import { BottomSheet } from 'react-native-theme-component';
import { Text, TouchableOpacity } from 'react-native';
import useMergeStyles from './styles';
import { ArrowRightIcon } from '../../assets/images';
import { ProductDetailModalProps } from './types';

const ProductDetailModal = (props: ProductDetailModalProps) => {
  const { productName, isVisible, actions, onPressedItem, onClose, style } = props;

  const styles = useMergeStyles(style);

  return (
    <BottomSheet
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={{
        contentContainerStyle: {
          paddingHorizontal: 5,
        },
      }}
    >
      <Text style={styles.productNameTextStyle}>{productName}</Text>
      {actions.map((item, index) => (
        <TouchableOpacity
          key={`${index}-${item}`}
          style={styles.buttonContainerStyle}
          activeOpacity={0.8}
          onPress={() => onPressedItem(item)}
        >
          <Text style={styles.actionNameTextStyle}>{item}</Text>
          <ArrowRightIcon size={12} />
        </TouchableOpacity>
      ))}
    </BottomSheet>
  );
};

export default ProductDetailModal;
