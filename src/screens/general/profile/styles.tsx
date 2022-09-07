import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import {StyleSheet} from 'react-native';

const {LIGHT_GRAY, WHITE} = COLORS;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_GRAY,
  },
  headerContainer: {
    backgroundColor: WHITE,
    height: RF(170),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY,
  },
  profilePhoto: {height: RF(70), width: RF(70), borderRadius: RF(100)},
  userInfoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    ...GST.pl4,
  },

  editbtn: {height: RF(35), borderRadius: RF(3)},
  listHeader: {alignItems: 'center', justifyContent: 'center', flexGrow: 1},
});
