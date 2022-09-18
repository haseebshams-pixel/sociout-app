import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF, WP} from '@theme/responsive';
import {StyleSheet} from 'react-native';

const {SECONDARY_LIGHT_GRAY, WHITE} = COLORS;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    position: 'relative',
  },
  headerContainer: {
    backgroundColor: WHITE,
    ...GST.pb2,
    ...GST.pt2,
  },
  profilePhoto: {height: RF(70), width: RF(70), borderRadius: RF(100)},
  userInfoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    ...GST.pl4,
    ...GST.pr1,
  },

  editbtn: {height: RF(30), borderRadius: RF(3)},
  removebtn: {
    width: WP(45),
    height: RF(30),
    borderRadius: RF(3),
    backgroundColor: COLORS.PLACEHOLDER,
    borderColor: COLORS.PLACEHOLDER,
  },
  rejectbtn: {
    height: RF(30),
    width: WP(45),
    borderRadius: RF(3),
    backgroundColor: COLORS.RED,
    borderColor: COLORS.RED,
  },
  confirmbtn: {
    height: RF(30),
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
