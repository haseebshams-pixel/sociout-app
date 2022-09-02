import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreatePost from '@screens/general/createPost';
import React from 'react';

const Stack = createNativeStackNavigator();

const PostStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CreatePost" component={CreatePost} />
    </Stack.Navigator>
  );
};
export default PostStack;
