import {navigationRef} from '@services/navService';
import {RF} from '@theme/responsive';
import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {back} from '@assets/icons';
import {COLORS} from '@theme/colors';
const {BLACK} = COLORS;

const BackButton = ({
  containerStyle,
  color,
  backAction,
}: {
  containerStyle?: ViewStyle;
  color?: any;
  backAction?: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        backAction ? backAction() : navigationRef.current.goBack()
      }
      style={containerStyle}>
      <FastImage source={back} style={styles.icon} tintColor={color || BLACK} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: RF(20),
    height: RF(20),
  },
});

export default BackButton;
