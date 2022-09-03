import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Chats from '@screens/general/chats';
import CreatePost from '@screens/general/createPost';
import Notifications from '@screens/general/notifications';
import {ROUTES} from '@utils/routes';
import React from 'react';
import MyTabs from '../tabs/mainTabs';
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.HOME} component={MyTabs} />
      <Stack.Screen name={ROUTES.NOTIFICATIONS} component={Notifications} />
      <Stack.Screen name={ROUTES.CHAT} component={Chats} />
    </Stack.Navigator>
  );
};

export default MainStack;
