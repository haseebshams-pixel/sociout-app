import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Chats from '@screens/general/chats';
import Notifications from '@screens/general/notifications';
import {ROUTES} from '@utils/routes';

import React from 'react';

const Stack = createNativeStackNavigator();

const NotificationStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Chats" component={Chats} />
    </Stack.Navigator>
  );
};
export default NotificationStack;
