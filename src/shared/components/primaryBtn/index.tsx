import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import React from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SkypeIndicator} from 'react-native-indicators';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const {WHITE, PRIMARY, PRIMARY_LIGHT} = COLORS;

interface Props {
  title: string;
  onPress: () => void;
  titleColor?: string;
  titleSize?: number;
  bgColor?: string;
  customStyle?: ViewStyle | any;
  customContainerStyle?: ViewStyle | any;
  disabled: any;
  sticky?: boolean;
  leftIcon?: any;
  flex?: boolean;
  leftIconStyle: ViewStyle | any;
  tintColor: string;
  loader: boolean;
  loaderColor: string;
  disableColor: string;
}

const PrimaryBtn = ({
  title,
  onPress,
  titleColor = WHITE,
  titleSize = 16,
  customStyle,
  disabled = false,
  sticky,
  leftIcon,
  bgColor,
  disableColor,
  flex,
  customContainerStyle,
  leftIconStyle,
  tintColor,
  loader,
  loaderColor = WHITE,
}: Partial<Props>) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        sticky && {...styles.sticky, paddingBottom: insets.bottom},
        flex && GST.FLEX,
        customContainerStyle,
      ]}>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: disabled
              ? disableColor
                ? disableColor
                : PRIMARY_LIGHT
              : PRIMARY,
            borderColor: disabled
              ? disableColor
                ? disableColor
                : PRIMARY_LIGHT
              : PRIMARY,
          },
          customStyle,
        ]}
        onPress={onPress}
        disabled={disabled}>
        {leftIcon && (
          <FastImage
            source={leftIcon}
            style={[styles.leftIcon, leftIconStyle]}
            tintColor={tintColor}
          />
        )}
        {loader ? (
          <SkypeIndicator size={titleSize} color={loaderColor} />
        ) : (
          <CustomText color={titleColor} size={titleSize}>
            {title}
          </CustomText>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GST.mt3,
    height: RF(50),
    borderRadius: RF(15),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
  },
  sticky: {
    justifyContent: 'flex-end',
  },
  leftIcon: {
    width: RF(22),
    height: RF(22),
    marginRight: RF(10),
  },
});

export default PrimaryBtn;
