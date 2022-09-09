import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF, WP} from '@theme/responsive';
import {Dimensions, StyleSheet} from 'react-native';

const {LIGHT_GRAY} = COLORS;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconStyle: {width: RF(20), height: RF(20)},
  imageStyle: {
    width: RF(40),
    height: RF(40),
    backgroundColor: LIGHT_GRAY,
    borderRadius: RF(20),
    justifyContent: 'center',
    alignItems: 'center',
    ...GST.mr2,
  },
  pdf: {
    flex: 1,
  },
});
