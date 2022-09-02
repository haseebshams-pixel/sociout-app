import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Chats from '@screens/general/chats';
import CreatePost from '@screens/general/createPost';
import {ROUTES} from '@utils/routes';
import React from 'react';
import MyTabs from '../tabs/mainTabs';
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.HOME} component={MyTabs} />

      <Stack.Screen name={ROUTES.CREATE_POST} component={CreatePost} />

      <Stack.Screen name={ROUTES.CHAT} component={Chats} />
    </Stack.Navigator>
  );
};

export default MainStack;
