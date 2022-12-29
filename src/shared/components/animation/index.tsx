import React from 'react';
import LottieView from 'lottie-react-native';
import CustomText from '@components/customText';
import {View} from 'react-native';
import {RF} from '@theme/responsive';

interface Props {
  Pic: any;
  Message?: string;
}

function LotieAnimation({Pic, Message}: Props) {
  return (
    <>
      <View
        style={{
          height: RF(200),
          width: '100%',
          // borderWidth: 1,
        }}>
        <LottieView
          source={require('../../../assets/animations/notFound.json')}
          autoPlay
          loop
        />
      </View>
      <CustomText size={15}>{Message}</CustomText>
    </>
  );
}

export default LotieAnimation;
