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
  profilePic: {height: RF(45), width: RF(45), borderRadius: RF(100)},
  removeBTN: {
    width: RF(65),
    marginTop: RF(0),
    height: RF(25),
    borderRadius: RF(5),
    backgroundColor: COLORS.RED,
    borderColor: COLORS.RED,
  },
  addBTN: {
    width: RF(65),
    marginTop: RF(0),
    height: RF(25),
    borderRadius: RF(5),
  },
  requestBTN: {
    width: RF(70),
    marginTop: RF(0),
    height: RF(25),
    borderRadius: RF(5),
  },
});
