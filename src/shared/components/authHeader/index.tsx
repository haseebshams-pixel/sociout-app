import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF} from '@theme/responsive';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const {LIGHT_GRAY} = COLORS;

interface Props {
  title: string;
  desc?: string;
}

const AuthHeader = ({title, desc}: Props) => {
  return (
    <View style={[styles.container]}>
      <CustomText bold size={30}>
        {title}
      </CustomText>
      {desc && (
        <CustomText color={LIGHT_GRAY} size={14} style={GST.mt2}>
          {desc}
        </CustomText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...GST.mb4,
  },
});

export default AuthHeader;
