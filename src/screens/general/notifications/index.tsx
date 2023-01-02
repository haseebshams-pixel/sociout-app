//import liraries
import {chatIcon} from '@assets/icons';
import Header from '@components/header';
import Wrapper from '@components/wrapper';
import {navigate} from '@services/navService';
import {COLORS} from '@theme/colors';
import {ROUTES} from '@utils/routes';
import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
const {DARK_GRAY} = COLORS;

// create a component
const Notifications = ({route}: any) => {
  const {user} = useSelector((state: any) => state.root.user);
  const [value, setvalue] = useState<any>('');

  return (
    <Wrapper>
      <Header
        title={'Notifications'}
        userIcon
        backAction={() => navigate('ProfileStack')}
      />
    </Wrapper>
  );
};
//make this component available to the app
export default Notifications;
