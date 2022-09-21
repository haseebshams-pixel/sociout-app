import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF, WP} from '@theme/responsive';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import PrimaryBtn from '@components/primaryBtn';
import {Overlay} from 'react-native-elements';

interface Props {
  visible: any;
  toggleOverlay: any;
  openGallery: any;
  openCamera: any;
  removePhoto: any;
}

const EditOverlay = ({
  visible,
  toggleOverlay,
  openGallery,
  openCamera,
  removePhoto,
}: Partial<Props>) => {
  return (
    <View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={[styles.container]}>
        <View style={[styles.modalizeContainer]}>
          <View
            style={[
              {
                backgroundColor: COLORS.LIGHT_GRAY,
                width: WP(90),
                borderTopLeftRadius: RF(5),
                borderTopRightRadius: RF(5),
              },
            ]}>
            <PrimaryBtn
              onPress={openCamera}
              titleSize={14}
              title="Take Photo"
              customStyle={[styles.customBtn]}
              titleColor={COLORS.BLACK}
              customContainerStyle={[styles.btnContainer]}
            />
            <PrimaryBtn
              onPress={openGallery}
              titleSize={14}
              titleColor={COLORS.BLACK}
              title="Choose from Gallery"
              customStyle={[styles.customBtn]}
              customContainerStyle={[styles.btnContainer]}
            />
            <PrimaryBtn
              titleSize={14}
              titleColor={COLORS.BLACK}
              title="Remove Photo"
              customStyle={[styles.customBtn]}
              customContainerStyle={[styles.btnContainer]}
              onPress={removePhoto}
            />
          </View>

          <PrimaryBtn
            titleSize={14}
            titleColor={COLORS.BLACK}
            title="Cancel"
            customStyle={[styles.customBtn2]}
            customContainerStyle={[styles.btnContainer]}
            onPress={toggleOverlay}
          />
        </View>
      </Overlay>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WP(100),
    backgroundColor: 'transparent',
  },
  modalizeContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    ...GST.mb4,
    alignItems: 'center',
  },
  customBtn: {
    height: RF(40),
    width: WP(90),
    borderRadius: RF(0),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginTop: RF(0),
    marginBottom: RF(0),
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderBottomColor: 'grey',
  },
  customBtn2: {
    height: RF(40),
    width: WP(90),
    borderRadius: RF(5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderColor: COLORS.LIGHT_GRAY,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditOverlay;
