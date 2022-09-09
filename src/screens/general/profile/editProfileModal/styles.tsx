import {COLORS} from '@theme/colors';
import {FONTS} from '@theme/fonts';
import {GST} from '@theme/globalStyles';
import {HP, RF, WP} from '@theme/responsive';
import {ANDROID} from '@utils/constants';
import {StyleSheet} from 'react-native';
const {REGULAR} = FONTS;

export const styles = StyleSheet.create({
  modalView: {
    height: HP(100),
    width: WP(100),
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    padding: RF(15),
  },
});
