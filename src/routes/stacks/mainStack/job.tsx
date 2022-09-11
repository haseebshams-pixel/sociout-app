import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Jobs from '@screens/general/jobs';
import {ROUTES} from '@utils/routes';
import React from 'react';

const Stack = createNativeStackNavigator();

const JobsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTES.JOBS} component={Jobs} />
    </Stack.Navigator>
  );
};

export default JobsStack;
