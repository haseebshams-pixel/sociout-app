//import liraries
import {
  aboutIcon,
  changePasswordIcon,
  deleteIcon,
  logoutIcon,
  termsIcon,
  userIcon,
} from '@assets/icons';
import CustomText from '@components/customText';
import Header from '@components/header';
import PrimaryBtn from '@components/primaryBtn';
import Wrapper from '@components/wrapper';
import {resetUser} from '@redux/reducers/userSlice';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF, WP} from '@theme/responsive';
import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';

import {styles} from './styles';
const {WHITE, PRIMARY} = COLORS;
// create a component
const Settings = ({route}: any) => {
  const {user} = useSelector((state: any) => state.root.user);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <StatusBar translucent barStyle={'dark-content'} />
      <Header title={'Settings'} leftIcon />
      <View style={[styles.container]}>
        <PrimaryBtn
          title="Personal Information"
          leftIcon={userIcon}
          tintColor={WHITE}
          leftIconStyle={styles.iconStyle}
        />
        <PrimaryBtn
          title="Change Password"
          leftIcon={changePasswordIcon}
          tintColor={WHITE}
          leftIconStyle={styles.passwordIconStyle}
        />
        <PrimaryBtn
          title="Terms of Use"
          leftIcon={termsIcon}
          tintColor={WHITE}
          leftIconStyle={styles.iconStyle}
        />
        <PrimaryBtn
          title="About"
          leftIcon={aboutIcon}
          tintColor={WHITE}
          leftIconStyle={styles.iconStyle}
        />
        <PrimaryBtn
          title="Delete Account"
          leftIcon={deleteIcon}
          tintColor={WHITE}
          leftIconStyle={styles.iconStyle}
          customStyle={styles.deleteContainer}
        />
        <PrimaryBtn
          title="Log out"
          leftIcon={logoutIcon}
          tintColor={PRIMARY}
          titleColor={PRIMARY}
          leftIconStyle={styles.iconStyle}
          customStyle={styles.logoutContainer}
          onPress={() => {
            dispatch(resetUser());
            console.log('here');
          }}
        />
      </View>
    </Wrapper>
  );
};
//make this component available to the app
export default Settings;
