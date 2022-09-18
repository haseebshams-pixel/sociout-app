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
  mainContainer: {
    flex: 1,
    paddingLeft: RF(15),
    paddingRight: RF(15),
  },
  profilePhoto: {height: RF(70), width: RF(70), borderRadius: RF(100)},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ANDROID ? RF(8) : RF(9),
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: RF(5),
    ...GST.mb4,
  },
  inputStyle: {
    flex: 1,
    paddingRight: RF(10),
    fontFamily: REGULAR,
    color: COLORS.BLACK,
    fontSize: RF(12),
    paddingVertical: RF(0),
  },
  customBtn: {
    height: RF(30),
    width: WP(50),
    borderRadius: RF(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
  },
  btnContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
