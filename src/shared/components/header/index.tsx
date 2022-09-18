import BackButton from '@components/backButton';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import React from 'react';
import {Pressable, StyleSheet, View, ViewProps, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from '../customText';
import {useSelector} from 'react-redux';
import {profilePlaceholder} from '@assets/images';
import {PHOTO_URL} from '@utils/endpoints';

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
  rightAction: any;
  leftText: string;
  rightText: string;
  userIcon: any;
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
    rightAction,
    leftText,
    rightText,
    userIcon,
  } = props;
  const {user} = useSelector((state: any) => state?.root?.user);
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
          {leftText && (
            <Pressable onPress={backAction}>
              <CustomText>{leftText}</CustomText>
            </Pressable>
          )}
          {leftIcon ? (
            <BackButton color={color} backAction={backAction} />
          ) : null}
          {userIcon && (
            <Pressable onPress={() => backAction()}>
              <FastImage
                source={
                  user?.avatar
                    ? {uri: PHOTO_URL + user?.avatar}
                    : profilePlaceholder
                }
                style={[{width: RF(30), height: RF(30), borderRadius: RF(100)}]}
              />
            </Pressable>
          )}
        </View>
      </View>
      <View style={styles.middleContainer}>
        <CustomText size={15} color={titleColor}>
          {title}
        </CustomText>
      </View>
      <View style={styles.lastContainer}>
        {rightText && (
          <Pressable onPress={rightAction}>
            <CustomText color={COLORS.PRIMARY}>{rightText}</CustomText>
          </Pressable>
        )}
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
    position: 'relative',
  },
  subContainer: {flex: 0.2},
  middleContainer: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastContainer: {flex: 0.2, alignItems: 'flex-end'},
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
