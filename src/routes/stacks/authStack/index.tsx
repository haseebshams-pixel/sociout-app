import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '@screens/auth/login';
import Wellcome from '@screens/auth/welcome';
import SignUp from '@screens/auth/signup';
import SignupSuccess from '@screens/auth/signup/signupSuccess';
import {ROUTES} from '@utils/routes';
import React from 'react';
import {StatusBar} from 'react-native';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={ROUTES.WELCOME} component={Wellcome} />
        <Stack.Screen name={ROUTES.LOGIN} component={Login} />
        <Stack.Screen name={ROUTES.SIGNUP} component={SignUp} />
        <Stack.Screen name={ROUTES.SIGNUP_SUCCESS} component={SignupSuccess} />
      </Stack.Navigator>
    </>
  );
};

export default AuthStack;
