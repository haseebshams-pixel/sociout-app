//import liraries
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
const FriendRequests = ({route}: any) => {
  const {user} = useSelector((state: any) => state.root.user);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <StatusBar translucent barStyle={'dark-content'} />
      <Header title={'Friend Requests'} leftIcon />
      <View style={[styles.container]}>
        <CustomText>Request One</CustomText>
      </View>
    </Wrapper>
  );
};
//make this component available to the app
export default FriendRequests;
