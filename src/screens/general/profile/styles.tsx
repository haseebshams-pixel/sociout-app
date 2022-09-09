import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF, WP} from '@theme/responsive';
import {StyleSheet} from 'react-native';

const {SECONDARY_LIGHT_GRAY, WHITE} = COLORS;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SECONDARY_LIGHT_GRAY,
    position: 'relative',
  },
  headerContainer: {
    backgroundColor: WHITE,
    ...GST.pb2,
    ...GST.pt2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY,
  },
  profilePhoto: {height: RF(70), width: RF(70), borderRadius: RF(100)},
  userInfoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    ...GST.pl4,
    ...GST.pr1,
  },

  editbtn: {height: RF(35), borderRadius: RF(3)},
  removebtn: {
    height: RF(35),
    borderRadius: RF(3),
    backgroundColor: COLORS.RED,
    borderColor: COLORS.RED,
  },
  rejectbtn: {
    height: RF(35),
    width: WP(45),
    borderRadius: RF(3),
    backgroundColor: COLORS.RED,
    borderColor: COLORS.RED,
  },
  confirmbtn: {
    height: RF(35),
    width: WP(45),
    borderRadius: RF(3),
  },
  listHeader: {alignItems: 'center', justifyContent: 'center', flex: 1},
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 1,
  },
});
