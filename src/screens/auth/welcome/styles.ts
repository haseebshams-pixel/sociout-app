import {COLORS} from '@theme/colors';
import {StyleSheet} from 'react-native';
const SIZE = 220;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.SPLASH,
  },
  logoImage: {width: SIZE * 1.4, height: SIZE * 1.4},
  ButtonsContainer: {
    justifyContent: 'center',
    width: '100%',
  },
});

export default styles;
