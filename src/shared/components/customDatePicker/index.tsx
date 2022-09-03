import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import React, {forwardRef, useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import CustomText from '../customText';
import {FONTS} from '@theme/fonts';
import {ANDROID} from '@utils/constants';
import DatePicker from 'react-native-modern-datepicker';
const {REGULAR} = FONTS;

const {BLACK, SECONDARY_BLACK, SECONDARY_GRAY, RED, LIGHT_GRAY, PRIMARY} =
  COLORS;

interface DatePickerProp extends TextInputProps {
  title: any;
  titleColor: string;
  containerStyle: ViewStyle;
  error: any;
  errorStyle: any;
  required: boolean;
  mainContainerStyle: ViewStyle;
  tintColor: any;
  value: any;
  onChange: any;
}

const CustomDatePicker = forwardRef(
  (props: Partial<DatePickerProp>, ref: any) => {
    const {
      title,
      titleColor = SECONDARY_BLACK,
      error,
      containerStyle,
      errorStyle,
      value,
      required,
      onChange,
      mainContainerStyle,
    } = props;
    const labelSize = ANDROID ? 15 : 14;
    const [modalVisible, setModalVisible] = useState(false);
    return (
      <>
        <View style={[styles.mainContainer, mainContainerStyle]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {!!title && (
              <CustomText size={labelSize} color={titleColor} style={GST.mb2}>
                {title}
                <CustomText size={15} color={PRIMARY}>
                  {required ? '*' : ''}
                </CustomText>
              </CustomText>
            )}
          </View>
          <Pressable
            style={[
              styles.subContainer,
              containerStyle,
              !!error && GST.ERROR_CONTAINER,
            ]}
            onPress={() => setModalVisible(true)}>
            {value != '' ? (
              <CustomText size={15} color={COLORS.BLACK} style={[styles.input]}>
                {value}
              </CustomText>
            ) : (
              <CustomText size={15} color={COLORS.GRAY} style={[styles.input]}>
                Select Date of Birth
              </CustomText>
            )}
          </Pressable>
          {!!error && (
            <CustomText style={[GST.ERROR, errorStyle]}>{error}</CustomText>
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <TouchableOpacity
            style={styles.centeredView}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}>
            <DatePicker
              onSelectedChange={(date: any) => {
                onChange('DOB', date);
                setModalVisible(!modalVisible);
              }}
              options={styles.pickerOptions}
              style={{borderRadius: 10}}
              mode="calendar"
            />
          </TouchableOpacity>
        </Modal>
      </>
    );
  },
);

const styles = StyleSheet.create({
  mainContainer: {
    ...GST.mb1,
    position: 'relative',
  },
  input: {
    paddingHorizontal: RF(14),
    fontFamily: REGULAR,
  },
  subContainer: {
    paddingVertical: ANDROID ? RF(12) : RF(14),
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: RF(10),
    ...GST.mb4,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: RF(5),
  },
  pickerOptions: {
    backgroundColor: COLORS.PRIMARY,
    textHeaderColor: COLORS.WHITE,
    textDefaultColor: COLORS.WHITE,
    selectedTextColor: '#fff',
    mainColor: COLORS.DARKBLUE,
    textSecondaryColor: COLORS.WHITE,
    borderColor: 'rgba(122, 146, 165, 0.1)',
  },
});

export default CustomDatePicker;
