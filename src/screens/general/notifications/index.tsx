//import liraries
import CustomText from '@components/customText';
import Header from '@components/header';
import {HeaderComponent} from '@components/searchHeader';
import Wrapper from '@components/wrapper';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF, WP} from '@theme/responsive';
import React, {useEffect, useState} from 'react';
import {Button, StatusBar, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {styles} from './styles';
const {DARK_GRAY} = COLORS;

// create a component
const Notifications = ({route}: any) => {
  const {user} = useSelector((state: any) => state.root.user);
  const [value, setvalue] = useState<any>('');

  return (
    <Wrapper>
      <StatusBar translucent barStyle={'dark-content'} />
      <Header title={'Notifications'} />
    </Wrapper>
  );
};
//make this component available to the app
export default Notifications;
