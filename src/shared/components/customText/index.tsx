import {COLORS} from '@theme/colors';
import {FONTS} from '@theme/fonts';
import {RF} from '@theme/responsive';
import React from 'react';
import {Text, TextProps} from 'react-native';

const {REGULAR, SEMI_BOLD, BOLD} = FONTS;
const {BLACK} = COLORS;

interface Props extends TextProps {
  style: any;
  bold: boolean;
  semiBold: boolean;
  size: number;
  color: string;
  capital: boolean;
  children: any;
  numberOfLines: number;
  italic: boolean;
  onPress: () => void;
  center: boolean;
}

const CustomText = (props: Partial<Props>) => {
  const {
    bold,
    semiBold,
    size = 12,
    color = BLACK,
    style,
    numberOfLines = 0,
    capital = false,
    onPress,
    center,
  } = props;
  return (
    <Text
      onPress={onPress}
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: REGULAR,
          fontSize: RF(size),
          fontWeight: bold ? '700' : semiBold ? '500' : 'normal',
          color,
          textTransform: capital ? 'uppercase' : 'none',
          textAlign: center ? 'center' : 'auto',
        },
        style,
      ]}>
      {props.children}
    </Text>
  );
};

export default CustomText;
