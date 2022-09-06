import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import {StyleSheet} from 'react-native';

const {LIGHT_GRAY} = COLORS;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: RF(200),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY,
  },
  profilePhoto: {height: RF(80), width: RF(80), borderRadius: RF(100)},
  userInfoContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  editbtn: {height: RF(35), borderRadius: RF(3)},
});
