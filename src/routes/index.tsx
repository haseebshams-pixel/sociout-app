import AuthStack from '@routes/stacks/authStack';
import MainStack from '@routes/stacks/mainStack';
import React from 'react';
import {useSelector} from 'react-redux';

const Routes = () => {
  const {user, isLoggedIn} = useSelector((state: any) => state.root.user);
  return <>{isLoggedIn ? <MainStack /> : <AuthStack />}</>;
};

export default Routes;
