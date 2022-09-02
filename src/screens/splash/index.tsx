import {splashlogo} from '@assets/icons';
import {COLORS} from '@theme/colors';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
const {BLACK} = COLORS;
const SIZE = 200;

const Splash = () => {
  return (
    <View style={styles.container}>
      <FastImage
        style={{width: SIZE, height: SIZE}}
        source={splashlogo}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLACK,
  },
});

export default Splash;
