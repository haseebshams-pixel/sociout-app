import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import {StyleSheet} from 'react-native';

const {LIGHT_GRAY, RED, WHITE, PRIMARY} = COLORS;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: RF(20),
  },
  iconStyle: {
    width: RF(15),
    height: RF(15),
  },
  passwordIconStyle: {
    width: RF(18),
    height: RF(18),
  },
  deleteContainer: {
    backgroundColor: RED,
    borderColor: RED,
  },
  logoutContainer: {
    backgroundColor: WHITE,
    borderColor: PRIMARY,
  },
});
