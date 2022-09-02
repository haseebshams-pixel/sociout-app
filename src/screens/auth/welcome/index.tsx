import PrimaryBtn from '@components/primaryBtn';
import {navigate} from '@services/navService';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import {ROUTES} from '@utils/routes';
import React from 'react';
import {View} from 'react-native';
import styles from './styles';
const {DARKBLUE, PRIMARY} = COLORS;

const Wellcome = ({}) => {
  const isNavigate = (route: any) => {
    navigate(route);
  };
  return (
    <View style={styles.Logochildcontainer}>
      <View style={styles.footer}>
        <View style={[styles.BottomContainer]}>
          <PrimaryBtn
            title={'Sign Up'}
            customStyle={[GST.mb2, GST.mx4]}
            titleSize={16}
            onPress={() => isNavigate(ROUTES.SIGNUP)}
          />
          <PrimaryBtn
            title={'Log In'}
            bgColor={DARKBLUE}
            titleColor={PRIMARY}
            titleSize={16}
            customStyle={[GST.my2, GST.mx4]}
            onPress={() => isNavigate(ROUTES.LOGIN)}
          />
        </View>
      </View>
    </View>
  );
};
export default Wellcome;
