import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    padding: RF(15),
    ...GST.mb2,
    borderWidth: RF(1),
    borderColor: COLORS.LIGHT_GRAY,
    borderRadius: RF(5),
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
});
