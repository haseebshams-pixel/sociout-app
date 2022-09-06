import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    margin: 3,
    color: 'transparent',
    borderRadius: 100,
    borderColor: COLORS.PLACEHOLDER,
    backgroundColor: COLORS.PLACEHOLDER,
    borderWidth: 1,
    width: RF(10),
    height: RF(10),
  },
  dotActive: {
    margin: 3,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 100,
    width: RF(12),
    height: RF(12),
  },
});
