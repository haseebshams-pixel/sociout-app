import {splashlogo} from '@assets/icons';
import PrimaryBtn from '@components/primaryBtn';
import {navigate} from '@services/navService';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {ROUTES} from '@utils/routes';
import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
const {DARKBLUE, WHITE} = COLORS;

const Wellcome = ({}) => {
  const isNavigate = (route: any) => {
    navigate(route);
  };
  return (
    <View style={styles.container}>
      <FastImage
        style={[styles.logoImage]}
        source={splashlogo}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={[styles.ButtonsContainer]}>
        <PrimaryBtn
          title={'Sign Up'}
          customStyle={[GST.mb2, GST.mx4]}
          titleSize={16}
          onPress={() => isNavigate(ROUTES.SIGNUP)}
        />
        <PrimaryBtn
          title={'Log In'}
          bgColor={DARKBLUE}
          titleColor={WHITE}
          titleSize={16}
          customStyle={[GST.my2, GST.mx4]}
          onPress={() => isNavigate(ROUTES.LOGIN)}
        />
      </View>
    </View>
  );
};
export default Wellcome;
