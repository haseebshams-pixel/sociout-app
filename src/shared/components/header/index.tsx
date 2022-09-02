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
  right?: string;
  press?: any;
  rightShow?: boolean;
  iconColor?: any;
  rightBtn?: any;
  color?: any;
  memberType?: any;
  rightPress?: any;
  rightImage?: any;
}

const Header = (props: viewProp) => {
  const {
    title,
    titleColor = BLACK,
    leftIcon,
    rightIcon,
    containerStyle,
    mainContainerStyle,
    right,
    press,
    rightShow,
    iconColor,
    rightBtn,
    color,
    memberType,
    rightImage,
    rightPress,
  } = props;

  return (
    <View style={[styles.mainContainer, mainContainerStyle]}>
      <View style={styles.subContainer}>
        <View style={{backgroundColor: iconColor}}>
          {leftIcon ? <BackButton color={color} /> : null}
        </View>
      </View>
      <View style={styles.middleContainer}>
        <CustomText size={15} color={titleColor}>
          {title}
        </CustomText>
      </View>
      <View style={styles.lastContainer}>
        {rightShow ? (
          <Pressable
            onPress={rightPress}
            style={[containerStyle, styles.container]}>
            <CustomText
              bold
              color={PRIMARY}
              style={[styles.TextView, {right: 10}]}>
              {right}
            </CustomText>
          </Pressable>
        ) : rightImage ? (
          <Pressable
            onPress={rightPress}
            style={[styles.containerView, styles.container]}>
            <FastImage
              source={rightImage}
              style={[styles.img, {backgroundColor: iconColor, height: RF(20)}]}
              resizeMode={'contain'}
            />
          </Pressable>
        ) : memberType === 2 || memberType === 1 ? null : (
          <Pressable
            onPress={press}
            style={[styles.containerView, styles.container]}>
            <FastImage
              source={rightIcon}
              style={[styles.img, {backgroundColor: iconColor}]}
              resizeMode={'contain'}
            />
            <FastImage
              source={rightBtn}
              style={[styles.img, {backgroundColor: iconColor}]}
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
    ...GST.my4,
    ...GST.mx3,
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
