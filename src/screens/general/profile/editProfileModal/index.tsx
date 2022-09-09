import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import React, {forwardRef, useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import CustomText from '@components/customText';
import {FONTS} from '@theme/fonts';
import {ANDROID} from '@utils/constants';
import {styles} from './styles';
import Header from '@components/header';
import Wrapper from '@components/wrapper';

const EditProfile = ({modalVisible, setModalVisible}: any) => {
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
            <Header
              title={'Edit Profile'}
              leftText={'Cancel'}
              rightText={'Done'}
              rightAction={() => setModalVisible(false)}
              backAction={() => setModalVisible(false)}
            />
          </Wrapper>
        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;
