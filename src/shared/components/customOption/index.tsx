import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {RF} from '@theme/responsive';
import OptionsMenu from 'react-native-option-menu';
import {moreIcon} from '@assets/icons';

interface Props {
  actions: object | any;
  options: object | any;
  redIndex: string | any;
}

const CustomOptions = ({actions, options, redIndex}: Props) => {
  return (
    <View style={[styles.container]}>
      <OptionsMenu
        button={moreIcon}
        buttonStyle={[styles.btnStyle]}
        destructiveIndex={redIndex}
        options={options}
        actions={actions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    width: RF(20),
    height: RF(20),
    resizeMode: 'contain',
  },
  container: {position: 'absolute', right: RF(5), top: RF(15)},
});

export default CustomOptions;
