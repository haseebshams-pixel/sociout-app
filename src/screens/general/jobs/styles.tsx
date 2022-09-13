import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF, WP} from '@theme/responsive';
import {Dimensions, StyleSheet} from 'react-native';

const {LIGHT_GRAY} = COLORS;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: RF(15),
  },
  listHeader: {alignItems: 'center', justifyContent: 'center', flexGrow: 1},
});
