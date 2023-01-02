import {closeIcon} from '@assets/icons';
import CustomText from '@components/customText';
import Header from '@components/header';
import Wrapper from '@components/wrapper';
import {COLORS} from '@theme/colors';
import {FONTS} from '@theme/fonts';
import {GST} from '@theme/globalStyles';
import {HP, RF, WP} from '@theme/responsive';
import {ANDROID} from '@utils/constants';
import moment from 'moment';
import React from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Briefcase, MapPin, Mail} from 'react-native-feather';
import {ScrollView} from 'react-native-gesture-handler';
import {openComposer} from 'react-native-email-link';

const JobModal = ({modalVisible, setModalVisible, item}: any) => {
  const emailSender = () => {
    try {
      openComposer({
        to: item?.email,
      });
    } catch (e) {
      console.log('ERR', e);
    }
  };
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={[styles.modalView]}>
          <Wrapper noPaddingBottom>
            <Pressable
              onPress={() => {
                setModalVisible(false);
              }}
              style={[GST.FLEX_ROW, GST.px3, styles.container]}>
              <FastImage
                source={closeIcon}
                style={[styles.img]}
                resizeMode={'contain'}
              />
            </Pressable>
            <ScrollView style={[GST.px3]}>
              <CustomText size={18} semiBold>
                {item?.title}
              </CustomText>
              <View style={[GST.FLEX_ROW, GST.mt1]}>
                <CustomText size={14}>{item?.companyName}</CustomText>
                <CustomText size={14}> - </CustomText>
                <CustomText size={14}>{item?.location}</CustomText>
              </View>
              <CustomText color="#3ec786" style={[GST.mt1]}>
                {moment(item?.date).fromNow()}
              </CustomText>
              <View style={[GST.mt2]}>
                <View style={[GST.FLEX_ROW, GST.mt1]}>
                  <Briefcase
                    stroke={COLORS.BLACK}
                    width={RF(18)}
                    height={RF(18)}
                  />
                  <CustomText size={15} style={[GST.ml1]}>
                    {item?.employmentType}
                  </CustomText>
                </View>
                <View style={[GST.FLEX_ROW, GST.mt1]}>
                  <MapPin
                    stroke={COLORS.BLACK}
                    width={RF(18)}
                    height={RF(18)}
                  />
                  <CustomText size={15} style={[GST.ml1]}>
                    {item?.location}
                  </CustomText>
                </View>
                <View style={[GST.FLEX_ROW, GST.mt1]}>
                  <Mail stroke={COLORS.BLACK} width={RF(18)} height={RF(18)} />
                  <Pressable onPress={emailSender}>
                    <CustomText
                      size={15}
                      color={COLORS.PRIMARY}
                      style={[GST.ml1]}>
                      {item?.email}
                    </CustomText>
                  </Pressable>
                </View>
              </View>
              <CustomText size={15} semiBold style={[GST.mt2]}>
                Job Description
              </CustomText>
              <CustomText style={[GST.mt1]} size={14}>
                {item?.description}
              </CustomText>
            </ScrollView>
          </Wrapper>
        </View>
      </Modal>
    </View>
  );
};
const {REGULAR} = FONTS;
const styles = StyleSheet.create({
  modalView: {
    height: HP(100),
    width: WP(100),
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    padding: RF(15),
  },
  img: {
    width: RF(20),
    height: RF(12),
  },
  container: {
    ...GST.pt3,
    justifyContent: 'flex-end',
  },
});

export default JobModal;
