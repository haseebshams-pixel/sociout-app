import {COLORS} from '@theme/colors';
import {RF, WP} from '@theme/responsive';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Overlay} from 'react-native-elements';
import {SkypeIndicator} from 'react-native-indicators';

const CustomLoading = ({
  visible,
  bgColor = 'transparent',
}: {
  visible: boolean;
  bgColor?: string;
}) => {
  return (
    <View>
      <Overlay
        isVisible={visible ? visible : false}
        overlayStyle={[styles.container, {backgroundColor: bgColor}]}>
        <SkypeIndicator color={COLORS.WHITE} size={RF(40)} />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WP(100),
  },
});

export default CustomLoading;
