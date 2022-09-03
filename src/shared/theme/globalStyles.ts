import {StyleSheet} from 'react-native';
import {COLORS} from './colors';
import {SIZING} from './sizing';
import {SPACING} from './spacing';
import {RF} from './responsive';

const {WHITE, RED} = COLORS;

export const GST = StyleSheet.create({
  ...SPACING,
  ...SIZING,
  FLEX: {
    flex: 1,
  },
  BODY_CONTAINER: {
    flex: 1,
    ...SPACING.px4,
  },
  FLEX_ROW: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  CENTER_ALIGN: {
    alignSelf: 'center',
  },
  HITSLOP: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  ERROR: {
    color: RED,
    position: 'absolute',
    bottom: RF(0),
    left: RF(0),
  },
  ERROR_CONTAINER: {
    borderWidth: 1,
    borderColor: RED,
  },
});
