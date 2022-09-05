import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF} from '@theme/responsive';
import {StyleSheet} from 'react-native';

const {LIGHT_GRAY} = COLORS;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: LIGHT_GRAY,
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
});
