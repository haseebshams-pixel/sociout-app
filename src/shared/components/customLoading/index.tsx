import {COLORS} from '@theme/colors';
import {RF} from '@theme/responsive';
import React from 'react';
import {StyleSheet} from 'react-native';
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
    <>
      <Overlay
        isVisible={visible}
        overlayStyle={[styles.container, {backgroundColor: bgColor}]}>
        <SkypeIndicator color={COLORS.WHITE} size={RF(40)} />
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default CustomLoading;
