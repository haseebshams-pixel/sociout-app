import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
  handleShare,
  sharePostData,
}: Partial<Props>) => {
  return (
    <Modalize ref={modalizeRef} modalHeight={RF(140)} withReactModal>
      <View style={[styles.modalizeContainer]}>
        <TouchableOpacity style={[GST.FLEX_ROW]} onPressIn={handleShare}>
          <Share2 stroke={COLORS.GRAY} />
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
