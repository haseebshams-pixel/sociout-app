import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    padding: RF(15),
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    ...GST.mb2,
  },
  userPhoto: {
    width: RF(35),
    height: RF(35),
    resizeMode: 'contain',
    borderRadius: RF(100),
  },
  seperator: {
    height: RF(2),
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  iconContainer: {
    alignItems: 'center',
  },
});
