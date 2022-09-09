import PrimaryBtn from '@components/primaryBtn';
import {COLORS} from '@theme/colors';
import {RF} from '@theme/responsive';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';
import {View} from 'react-native';
import {GST} from '@theme/globalStyles';
import CustomText from '@components/customText';
const {SECONDARY_LIGHT_GRAY, PRIMARY} = COLORS;
const CustomAlert = ({
  open,
  closeAlert,
  bgColor = 'rgba(0,0,0,0.5)',
  title,
  desc,
  desc2,
  name,
  actionBtnTitle,
  action,
  type,
}: {
  open: boolean;
  bgColor?: string;
  closeAlert?: any;
  title: string;
  desc?: string;
  desc2?: string;
  name?: string;
  actionBtnTitle: string;
  action?: any;
  type?: string;
}) => {
  return (
    <>
      <Overlay
        isVisible={open}
        onBackdropPress={closeAlert}
        overlayStyle={[styles.container, {backgroundColor: bgColor}]}>
        <View style={styles.modal}>
          <CustomText center size={14} bold>
            {title}
          </CustomText>
          <View style={styles.desc}>
            {desc && (
              <>
                <CustomText center size={12} style={GST.mt1}>
                  {desc}
                  {name && (
                    <CustomText size={12} style={GST.mt1} bold>
                      {name}
                    </CustomText>
                  )}
                  {desc2 && (
                    <CustomText size={12} style={GST.mt1}>
                      {desc2}
                    </CustomText>
                  )}
                </CustomText>
              </>
            )}
          </View>
          <Pressable style={styles.btn1} onPress={action}>
            <CustomText color={type == 'info' ? PRIMARY : 'red'} size={14}>
              {actionBtnTitle}
            </CustomText>
          </Pressable>
          {type != 'info' && (
            <Pressable style={styles.btn2} onPress={closeAlert}>
              <CustomText size={14}>{'Cancel'}</CustomText>
            </Pressable>
          )}
        </View>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    ...GST.pt4,
    width: '80%',
    backgroundColor: SECONDARY_LIGHT_GRAY,
    borderRadius: RF(10),
    borderWidth: 1,
  },
  btn1: {
    ...GST.mt4,
    ...GST.py3,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(60, 60, 67, 0.36)',
  },
  btn2: {
    ...GST.py3,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(60, 60, 67, 0.36)',
  },
  desc: {
    ...GST.mt1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default CustomAlert;
