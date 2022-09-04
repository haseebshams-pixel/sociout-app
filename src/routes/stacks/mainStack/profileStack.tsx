import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '@screens/general/profile';
import Settings from '@screens/general/setting';
import {ROUTES} from '@utils/routes';
import React from 'react';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.PROFILE} component={Profile} />
      <Stack.Screen name={ROUTES.SETTING} component={Settings} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
