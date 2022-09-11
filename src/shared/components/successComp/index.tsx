import CustomImage from '@components/customImage';
import CustomText from '@components/customText';
import PrimaryBtn from '@components/primaryBtn';
import Wrapper from '@components/wrapper';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF} from '@theme/responsive';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '@components/header';

const {WHITE, GRAY} = COLORS;

interface Props {
  image: any;
  title: string;
  desc: string;
  descv2: string;
  btnTitle: string;
  onBtnPress: () => void;
  header: boolean;
  noPaddingBottom: boolean;
  noPaddingTop: boolean;
}

const SuccessComp = ({
  image,
  title,
  desc,
  btnTitle,
  onBtnPress,
  header,
  noPaddingBottom,
  noPaddingTop,
  descv2,
}: Props) => {
  return (
    <Wrapper
      bgColor={WHITE}
      noPaddingBottom={noPaddingBottom}
      noPaddingTop={noPaddingTop}>
      {header && <Header leftIcon />}
      <View style={styles.bodyContainer}>
        <View style={{height: HP(9)}} />
        <CustomImage
          path={image}
          size={180}
          containerStyle={GST.CENTER_ALIGN}
        />
        <CustomText center bold size={28} style={GST.mt5}>
          {title}
        </CustomText>
        <View
          style={[
            GST.FLEX_ROW,
            {
              flexWrap: 'wrap',
              justifyContent: 'center',
              width: '90%',
              alignSelf: 'center',
            },
          ]}>
          <CustomText center size={15} color={GRAY} style={GST.mt2}>
            {desc}
          </CustomText>
          <CustomText center size={15} color={GRAY}>
            {descv2}
          </CustomText>
        </View>
      </View>
      <View style={{top: RF(25)}}>
        <PrimaryBtn
          sticky
          title={btnTitle}
          onPress={onBtnPress}
          customStyle={GST.mx4}
        />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    ...GST.BODY_CONTAINER,
    justifyContent: 'center',
  },
});

export default SuccessComp;
