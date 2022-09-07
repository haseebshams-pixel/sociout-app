import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FriendRequests from '@screens/general/friendRequests';
import Friends from '@screens/general/friends';
import Profile from '@screens/general/profile';
import Settings from '@screens/general/setting';
import {ROUTES} from '@utils/routes';
import React from 'react';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const ProfileStack = ({route}: any) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ROUTES.PROFILE}
        component={Profile}
        initialParams={route?.params}
      />
      <Stack.Screen name={ROUTES.SETTING} component={Settings} />
      <Stack.Screen name={ROUTES.FRIENDS} component={Friends} />
      <Stack.Screen name={ROUTES.REQUESTS} component={FriendRequests} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
