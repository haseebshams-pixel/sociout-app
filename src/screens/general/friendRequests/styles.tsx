import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF, WP} from '@theme/responsive';
import {StyleSheet} from 'react-native';

const {LIGHT_GRAY, RED, WHITE, PRIMARY} = COLORS;

export const styles = StyleSheet.create({
  container: {
    padding: RF(20),
    flex: 1,
  },
  renderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profilePic: {height: RF(40), width: RF(40), borderRadius: RF(100)},
  removeBTN: {
    width: RF(55),
    marginTop: RF(0),
    height: RF(25),
    borderRadius: RF(5),
    backgroundColor: COLORS.RED,
    borderColor: COLORS.RED,
  },
  addBTN: {
    width: RF(55),
    marginTop: RF(0),
    height: RF(25),
    borderRadius: RF(5),
  },
  acceptedBTN: {
    width: RF(80),
    marginTop: RF(0),
    height: RF(25),
    borderRadius: RF(5),
  },
  rejectedBTN: {
    width: RF(80),
    marginTop: RF(0),
    height: RF(25),
    borderRadius: RF(5),
    backgroundColor: COLORS.RED,
    borderColor: COLORS.RED,
    opacity: 0.6,
  },
});
