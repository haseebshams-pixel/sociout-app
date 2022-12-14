import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF} from '@theme/responsive';
import {StyleSheet} from 'react-native';

const {SECONDARY_LIGHT_GRAY, WHITE} = COLORS;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
  },
  iconStyle: {width: RF(20), height: RF(20)},
  imageStyle: {
    width: RF(40),
    height: RF(40),
    backgroundColor: WHITE,
    borderRadius: RF(20),
    justifyContent: 'center',
    alignItems: 'center',
    ...GST.mr2,
  },
  modalizeContainer: {
    flex: 1,
    paddingTop: RF(30),
    padding: RF(20),
  },
  listHeader: {alignItems: 'center', justifyContent: 'center', flexGrow: 1},
});
