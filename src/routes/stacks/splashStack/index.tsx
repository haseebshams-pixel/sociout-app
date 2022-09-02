import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Wellcome from '@screens/auth/welcome';
// import Splash from '@screens/splash';
import {ROUTES} from '@utils/routes';
import React from 'react';

const Stack = createNativeStackNavigator();

const SplashStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.SPLASH} component={Wellcome} />
    </Stack.Navigator>
  );
};

export default SplashStack;
