import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '@screens/general/home';
import {ROUTES} from '@utils/routes';
import React from 'react';
import {useSelector} from 'react-redux';
import ProfileStack from './profileStack';

const Stack = createNativeStackNavigator();

const FeedStack = () => {
  const {user} = useSelector((state: any) => state.root);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.HOME} component={Home} />
      <Stack.Screen
        name={ROUTES.PROFILESTACK}
        component={ProfileStack}
        initialParams={{id: user?.user?.id}}
      />
    </Stack.Navigator>
  );
};

export default FeedStack;
