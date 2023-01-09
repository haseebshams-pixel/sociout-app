import {View, Text, ViewStyle, Pressable} from 'react-native';
import React from 'react';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import {COLORS} from '@theme/colors';
import {Camera, Image} from 'react-native-feather';

interface Props {
  containerStyle: ViewStyle;
  openCamera: () => void;
  openGallery: () => void;
}

const PostActions = ({
  containerStyle,
  openCamera,
  openGallery,
}: Partial<Props>) => {
  return (
    <View
      style={[
        containerStyle,
        GST.FLEX_ROW,
        {
          paddingHorizontal: RF(15),
          paddingVertical: RF(5),
          backgroundColor: COLORS.WHITE,
          marginBottom: 0,
        },
      ]}>
      <Pressable onPress={openCamera}>
        <Camera stroke={COLORS.BLACK} width={RF(20)} height={RF(20)} />
      </Pressable>
      <Pressable onPress={openGallery}>
        <Image
          stroke={COLORS.BLACK}
          width={RF(20)}
          style={[GST.ml2]}
          height={RF(20)}
        />
      </Pressable>
    </View>
  );
};

export default PostActions;
