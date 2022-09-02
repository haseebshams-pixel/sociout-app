import {signupSuccess} from '@assets/images';
import SuccessComp from '@components/successComp';
import {ROUTES} from '@utils/routes';
import React from 'react';

const {WELCOME} = ROUTES;

const SignupSuccess = ({navigation}: any) => {
  return (
    <SuccessComp
      image={signupSuccess}
      title={'Thank you!'}
      desc={'Verification was successful'}
      btnTitle={'Continue'}
      onBtnPress={() => {
        navigation.reset({
          index: 1,
          routes: [{name: WELCOME}, {name: 'profileInfo'}],
        });
      }}
    />
  );
};

export default SignupSuccess;
