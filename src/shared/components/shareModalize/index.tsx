import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Share2} from 'react-native-feather';
import {Modalize} from 'react-native-modalize';

interface Props {
  modalizeRef: any;
  onClose: any;
  handleShare: any;
  sharePostData: {
    user: {
      firstname: string;
    };
  };
}

const ShareModalize = ({
  modalizeRef,
  onClose,
  handleShare,
  sharePostData,
}: Partial<Props>) => {
  return (
    <Modalize ref={modalizeRef} modalHeight={RF(170)} onClose={onClose}>
      <View style={[styles.modalizeContainer]}>
        <TouchableOpacity style={[GST.FLEX_ROW]} onPressIn={handleShare}>
          <Share2 color={COLORS.GRAY} />
          <View style={[GST.ml3]}>
            <CustomText bold color={COLORS.GRAY} size={15}>
              Repost
            </CustomText>
            <CustomText color={COLORS.GRAY}>
              {`Instantly bring ${sharePostData?.user?.firstname}'s post to others' feeds`}
            </CustomText>
          </View>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
};

export const styles = StyleSheet.create({
  modalizeContainer: {
    flex: 1,
    paddingTop: RF(30),
    padding: RF(20),
  },
});

export default ShareModalize;
