import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: RF(15),
  },
  header: {
    alignItems: 'center',
    ...GST.mt6,
  },
  primaryText: {
    textDecorationLine: 'none',
    fontSize: RF(16),
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: '10%',
  },
  forgotBtnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: RF(20),
  },
  forgotPasswordTxt: {
    textAlign: 'center',
    ...GST.mb20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsTxt: {
    textAlign: 'center',
    width: '70%',
    alignSelf: 'center',
  },
  logoStyle: {
    marginBottom: '50%',
  },
  clickHere: {paddingLeft: RF(5)},
});

export default styles;
