import {COLORS} from '@theme/colors';
import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

const LoadingView = () => {
  {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={COLORS.WHITE} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    backgroundColor: COLORS.PLACEHOLDER,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingView;
