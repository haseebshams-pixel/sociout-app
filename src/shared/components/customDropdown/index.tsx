import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF} from '@theme/responsive';
import React, {forwardRef, useRef, useState} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  downArrowIcon,
  hideEye,
  showEye,
  tickIcon,
  upArrowIcon,
} from '@assets/icons';
import CustomText from '../customText';
import {FONTS} from '@theme/fonts';
import {ANDROID} from '@utils/constants';
import {Modalize} from 'react-native-modalize';
const {REGULAR} = FONTS;

const {BLACK, SECONDARY_BLACK, SECONDARY_GRAY, RED, LIGHT_GRAY, PRIMARY} =
  COLORS;

interface InputProp {
  title: any;
  titleColor: string;
  containerStyle: ViewStyle;
  titleSize: number;
  rightIcon?: any;
  setValue: (val: string) => void | any;
  placeholder: string;
  error: any;
  errorStyle: any;
  iconColor: string;
  required: boolean;
  mainContainerStyle: ViewStyle | any;
  inputStyle: any;
  tintColor: any;
  value: any;
}

const DropDown = forwardRef((props: Partial<InputProp>, ref: any) => {
  const {
    title,
    titleColor = SECONDARY_BLACK,
    rightIcon,
    error,
    containerStyle,
    errorStyle,
    value,
    iconColor,
    placeholder,
    required,
    mainContainerStyle,
    inputStyle,
    tintColor,
    titleSize,
    setValue,
  } = props;
  const labelSize = titleSize ? titleSize : ANDROID ? 15 : 14;
  const modalizeRef = useRef<Modalize>(null);
  const filters = ['Full time', 'Half time', 'Contractual'];
  const [selected, setSelected] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    modalizeRef.current?.open();
    setIsOpen(true);
  };

  const onClose = () => {
    modalizeRef.current?.close();
    setIsOpen(false);
  };

  const ModalizeHeaderComponent = () => {
    return (
      <View style={[styles.modalizeHeader]}>
        <Pressable style={[styles.cancelContainer]} onPress={onClose}>
          <CustomText color={COLORS.WHITE} semiBold>
            Cancel
          </CustomText>
        </Pressable>
        <CustomText
          style={[{alignItems: 'center'}]}
          color={COLORS.WHITE}
          size={15}
          semiBold>
          Employment Type
        </CustomText>
      </View>
    );
  };

  const ModalizeListItem = ({item}: any) => {
    return (
      <Pressable
        onPress={() => {
          setSelected(item);
          setValue?.(item);
          onClose();
        }}
        style={[GST.FLEX_ROW_SPACE, GST.py2]}>
        <CustomText>{item}</CustomText>
        <View
          style={[
            {
              backgroundColor:
                selected == item ? COLORS.PRIMARY : COLORS.SECONDARY_LIGHT_GRAY,
            },
            styles.imgContainer,
          ]}>
          {selected == item && (
            <FastImage source={tickIcon} style={[styles.img]} />
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={[styles.mainContainer, mainContainerStyle]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <CustomText size={labelSize} color={titleColor} style={GST.mb1}>
          {title}
          <CustomText size={12} color={PRIMARY}>
            {required ? '*' : ''}
          </CustomText>
        </CustomText>
      </View>
      <Pressable
        style={[
          styles.subContainer,
          containerStyle,
          !!error && GST.ERROR_CONTAINER,
        ]}
        onPress={onOpen}>
        <View style={[styles.input, inputStyle]}>
          <CustomText
            color={
              placeholder && value === '' ? COLORS.DARK_GRAY : COLORS.BLACK
            }>
            {placeholder && value === '' ? placeholder : selected}
          </CustomText>
        </View>

        <FastImage
          source={isOpen ? upArrowIcon : downArrowIcon}
          style={styles.icon}
          resizeMode="contain"
        />
      </Pressable>
      {!!error && (
        <CustomText style={[GST.ERROR, errorStyle]}>{error}</CustomText>
      )}
      <Modalize
        ref={modalizeRef}
        withReactModal
        handlePosition="inside"
        handleStyle={{backgroundColor: COLORS.PRIMARY}}
        modalHeight={HP(28)}
        onClose={() => setIsOpen(false)}
        HeaderComponent={<ModalizeHeaderComponent />}
        flatListProps={{
          scrollEnabled: true,
          style: [styles.listContainer],
          data: filters,
          renderItem: ({item}: any) => {
            return <ModalizeListItem item={item} />;
          },
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    ...GST.mb1,
    position: 'relative',
  },
  input: {
    flex: 1,
    paddingRight: RF(14),
    fontFamily: REGULAR,
    color: BLACK,
    fontSize: RF(15),
    paddingVertical: RF(2),
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: RF(16),
    paddingVertical: ANDROID ? RF(12) : RF(14),
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: RF(10),
    ...GST.mb4,
  },
  multiline: {
    maxHeight: RF(80),
  },
  flexStart: {
    alignItems: 'flex-start',
  },
  icon: {
    width: RF(12),
    height: RF(12),
  },
  listContainer: {
    paddingTop: RF(5),
    paddingLeft: RF(15),
    paddingRight: RF(15),
    paddingBottom: RF(5),
  },
  imgContainer: {
    borderRadius: RF(2),
    padding: RF(3),
    height: RF(18),
    width: RF(18),
  },
  img: {height: RF(12), width: RF(12)},
  modalizeHeader: {
    backgroundColor: COLORS.PRIMARY,
    height: HP(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: RF(9),
    borderTopRightRadius: RF(9),
  },
  cancelContainer: {position: 'absolute', left: RF(20)},
});

export default DropDown;
