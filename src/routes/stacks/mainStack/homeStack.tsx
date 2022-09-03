import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '@screens/general/home';
import Notifications from '@screens/general/notifications';
import {ROUTES} from '@utils/routes';
import React from 'react';

const Stack = createNativeStackNavigator();

const FeedStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.HOME} component={Home} />
    </Stack.Navigator>
  );
};

export default FeedStack;
