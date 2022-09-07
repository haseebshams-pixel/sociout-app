import BackButton from '@components/backButton';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import React from 'react';
import {Pressable, StyleSheet, View, ViewProps, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '../customText';

const {BLACK, PRIMARY} = COLORS;

interface viewProp extends ViewProps {
  title?: string;
  titleColor?: string;
  containerStyle?: ViewStyle;
  mainContainerStyle?: ViewStyle;
  leftIcon?: any;
  rightIcon?: any;
  onPress?: any;
  iconColor?: any;
  color?: any;
  borderBottom: boolean;
  backAction: any;
}

const Header = (props: Partial<viewProp>) => {
  const {
    title,
    titleColor = BLACK,
    leftIcon,
    rightIcon,
    containerStyle,
    mainContainerStyle,
    onPress,
    iconColor,
    color,
    borderBottom,
    backAction,
  } = props;

  return (
    <View
      style={[
        styles.mainContainer,
        mainContainerStyle,
        borderBottom && {
          borderBottomWidth: RF(1),
          borderBottomColor: COLORS.LIGHT_GRAY,
        },
      ]}>
      <View style={styles.subContainer}>
        <View style={{backgroundColor: iconColor}}>
          {leftIcon ? (
            <BackButton color={color} backAction={backAction} />
          ) : null}
        </View>
      </View>
      <View style={styles.middleContainer}>
        <CustomText size={15} color={titleColor}>
          {title}
        </CustomText>
      </View>
      <View style={styles.lastContainer}>
        {rightIcon && (
          <Pressable
            onPress={onPress}
            style={[styles.containerView, styles.container]}>
            <FastImage
              source={rightIcon}
              style={[styles.img, {backgroundColor: iconColor, height: RF(20)}]}
              resizeMode={'contain'}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: RF(20),
    height: RF(12),
  },
  logo: {
    width: RF(23),
    height: RF(24),
  },
  bell: {
    width: RF(15),
    height: RF(20),
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    ...GST.py4,
    ...GST.px3,
  },
  subContainer: {flex: 0.1},
  middleContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastContainer: {flex: 0.1},
  subLastContainer: {
    flexDirection: 'row',
    marginLeft: -30,
  },
  TextView: {
    fontSize: RF(13),
  },
  container: {
    alignItems: 'center',
    width: RF(40),
    justifyContent: 'center',
  },
  containerView: {
    flexDirection: 'row',
  },
});

export default Header;
