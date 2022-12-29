import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF, WP} from '@theme/responsive';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: WP(100),
    height: RF(200),
    resizeMode: 'cover',
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    paddingBottom: RF(100),
  },
});
