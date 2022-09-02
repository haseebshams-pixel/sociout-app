import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import React from 'react';
import {TouchableOpacity, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';

interface Props {
  path: any;
  uri: any;
  resizeMode: 'contain' | 'center' | 'cover' | 'stretch';
  size: number;
  width: number;
  percentWidth: number;
  height: number;
  percentHeight: number;
  customStyle: any;
  onPress: () => void;
  tintColor: string;
  containerStyle?: ViewStyle;
  radius: any;
}

const CustomImage = ({
  path,
  uri,
  resizeMode = 'contain',
  size,
  width = 0,
  height = 0,
  customStyle,
  percentWidth,
  percentHeight,
  onPress,
  tintColor,
  containerStyle,
  radius,
}: Partial<Props>) => {
  return (
    <>
      <TouchableOpacity
        disabled={!onPress}
        onPress={onPress}
        hitSlop={GST.HITSLOP}
        style={containerStyle}>
        <FastImage
          source={uri ? {uri} : path}
          resizeMode={resizeMode}
          style={[
            {
              width: percentWidth ? `${percentWidth}%` : RF(size || width),
              height: percentHeight ? `${percentHeight}%` : RF(size || height),
              borderRadius: radius ? RF(radius) : 0,
            },
            customStyle,
          ]}
          tintColor={tintColor}
        />
      </TouchableOpacity>
    </>
  );
};

export default CustomImage;
