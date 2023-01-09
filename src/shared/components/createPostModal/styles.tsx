import CreateJobModal from '@components/createJobModal';
import {COLORS} from '@theme/colors';
import {FONTS} from '@theme/fonts';
import {GST} from '@theme/globalStyles';
import {HP, WP, RF} from '@theme/responsive';
import {ANDROID} from '@utils/constants';
import {StyleSheet} from 'react-native';

const {REGULAR} = FONTS;
const styles = StyleSheet.create({
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
    paddingHorizontal: RF(15),
  },
  profilePhoto: {height: RF(70), width: RF(70), borderRadius: RF(100)},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ANDROID ? RF(8) : RF(9),
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: RF(5),
    textAlignVertical: 'top',
    // marginBottom: RF(70),
  },
  multilineStyle: {
    maxHeight: HP(60),
  },
  inputStyle: {
    flex: 1,
    // paddingRight: RF(10),
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
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    ...GST.mb2,
    alignSelf: 'flex-start',
  },
  userPhoto: {
    width: RF(35),
    height: RF(35),
    resizeMode: 'contain',
    borderRadius: RF(100),
  },
});

export default styles;
