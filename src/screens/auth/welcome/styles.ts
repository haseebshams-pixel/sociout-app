import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF, WP} from '@theme/responsive';
import {StyleSheet} from 'react-native';
const {EX_DARK_BLUE} = COLORS;
const SIZE = 220;
const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    flex: 1,
    backgroundColor: EX_DARK_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Logochildcontainer: {flex: 1, backgroundColor: EX_DARK_BLUE},
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    top: RF(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  logoImage: {width: SIZE * 1.4, height: SIZE * 1.4},
  BottomContainer: {
    // height:RF(200),
    // top: RF(50),
    justifyContent: 'center',
  },
  fastImage: {width: SIZE, height: SIZE},
  header: {
    alignItems: 'center',
    ...GST.mt6,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: '10%',
  },
  footer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    height: RF(100),
  },
  logoStyle: {
    marginBottom: '50%',
  },
  logoMainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: EX_DARK_BLUE,
  },
  logostyle: {width: WP(20), height: HP(20)},
  clickHere: {paddingLeft: RF(5)},
});

export default styles;
