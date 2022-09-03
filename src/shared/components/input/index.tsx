import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import React, {forwardRef} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {hideEye, showEye} from '@assets/icons';
import CustomText from '../customText';
import {FONTS} from '@theme/fonts';
import {ANDROID} from '@utils/constants';
const {REGULAR} = FONTS;

const {BLACK, SECONDARY_BLACK, SECONDARY_GRAY, RED, LIGHT_GRAY, PRIMARY} =
  COLORS;

interface InputProp extends TextInputProps {
  title: any;
  titleColor: string;
  containerStyle: ViewStyle;
  HeadingTitle: string;
  titleSize: string;
  leftIcon?: any;
  rightIcon?: any;
  inputProps: TextInputProps;
  error: any;
  errorStyle: any;
  showPassword: boolean;
  toggleShowPassword: () => void;
  key: any;
  iconColor: string;
  required: boolean;
  onRightPress: () => void;
  setKeyPress: (key: string) => void;
  disableContainerPress: boolean;
  mainContainerStyle: ViewStyle | any;
  inputStyle: any;
  tintColor: any;
  charLimit: number;
  value: any;
}

const Input = forwardRef((props: Partial<InputProp>, ref: any) => {
  const {
    title,
    titleColor = SECONDARY_BLACK,
    leftIcon,
    rightIcon,
    error,
    containerStyle,
    errorStyle,
    showPassword,
    value,
    toggleShowPassword,
    iconColor,
    key,
    required,
    onRightPress,
    textContentType,
    multiline,
    setKeyPress,
    editable = true,
    disableContainerPress,
    mainContainerStyle,
    inputStyle,
    tintColor,
    charLimit,
  } = props;
  const labelSize = ANDROID ? 15 : 14;

  return (
    <View style={[styles.mainContainer, mainContainerStyle]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {!!title && (
          <CustomText size={labelSize} color={titleColor} style={GST.mb2}>
            {title}
            <CustomText size={15} color={PRIMARY}>
              {required ? '*' : ''}
            </CustomText>
          </CustomText>
        )}
        {!!charLimit && (
          <CustomText size={labelSize}>
            {value?.length > 0 && value.length}
            <CustomText size={labelSize} color={SECONDARY_GRAY} style={GST.mb2}>
              {value?.length > 0 && '/'}
              {charLimit}
            </CustomText>
          </CustomText>
        )}
      </View>
      <Pressable
        style={[
          styles.subContainer,
          containerStyle,
          !!error && GST.ERROR_CONTAINER,
          multiline && styles.flexStart,
        ]}
        disabled={disableContainerPress}
        onPress={onRightPress}>
        {!!leftIcon && (
          <FastImage
            key={key}
            source={leftIcon}
            style={[
              styles.icon,
              {borderColor: iconColor},
              GST.mr3,
              multiline && GST.mt1,
            ]}
            resizeMode={'contain'}
            // tintColor={tintColor ? tintColor : LIGHT_GRAY}
          />
        )}
        <TextInput
          ref={ref}
          maxLength={charLimit || props.maxLength}
          pointerEvents={editable ? 'auto' : 'none'}
          {...props}
          style={[styles.input, multiline && styles.multiline, inputStyle]}
          placeholderTextColor={SECONDARY_GRAY}
          onKeyPress={e => setKeyPress && setKeyPress(e.nativeEvent.key)}
        />
        {!!value && textContentType === 'password' && (
          <Pressable onPress={toggleShowPassword}>
            <FastImage
              source={showPassword ? showEye : hideEye}
              style={styles.icon}
              resizeMode="contain"
              tintColor={BLACK}
            />
          </Pressable>
        )}
        {!!rightIcon && (
          <Pressable onPress={onRightPress} hitSlop={GST.HITSLOP}>
            <FastImage
              source={rightIcon}
              style={styles.icon}
              resizeMode="contain"
            />
          </Pressable>
        )}
      </Pressable>
      {!!error && (
        <CustomText style={[GST.ERROR, errorStyle]}>{error}</CustomText>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    ...GST.mb1,
    position: 'relative',
  },
  input: {
    flex: 1,
    paddingRight: RF(14),
    fontFamily: REGULAR,
    color: BLACK,
    fontSize: RF(15),
    paddingVertical: RF(2),
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RF(16),
    paddingVertical: ANDROID ? RF(12) : RF(14),
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: RF(10),
    ...GST.mb4,
  },
  multiline: {
    maxHeight: RF(80),
  },
  flexStart: {
    alignItems: 'flex-start',
  },
  icon: {
    width: RF(15),
    height: RF(15),
  },
});

export default Input;
