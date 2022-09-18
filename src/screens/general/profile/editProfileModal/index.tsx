import {profilePlaceholder} from '@assets/images';
import CustomDatePicker from '@components/customDatePicker';
import CustomLoading from '@components/customLoading';
import CustomText from '@components/customText';
import Header from '@components/header';
import Input from '@components/input';
import PrimaryBtn from '@components/primaryBtn';
import Wrapper from '@components/wrapper';
import {setUser} from '@redux/reducers/userSlice';
import {editProfileDisableHandler, showToast} from '@services/helperService';
import {editUserProfile} from '@services/userService';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import {PHOTO_URL} from '@utils/endpoints';
import {EditProfileVS} from '@utils/validations';
import {Formik} from 'formik';
import moment from 'moment';
import React, {useState} from 'react';
import {Modal, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useDispatch, useSelector} from 'react-redux';
import EditOverlay from './editOverlay';
import {styles} from './styles';

const EditProfile = ({modalVisible, setModalVisible}: any) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state.root);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };
  const initialValues = {
    phoneNumber: user?.user?.phonenumber,
    firstName: user?.user?.firstname,
    DOB: moment(user?.user?.DOB).format('L'),
    lastName: user?.user?.lastname,
    bio: user?.user?.bio,
    avatar: user?.user?.avatar,
  };
  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    })
      .then(image => {
        console.log(image);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        toggleOverlay();
      });
  };
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
    })
      .then(image => {
        console.log(image);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        toggleOverlay();
      });
  };
  const submitHandler = (
    {DOB, firstName, lastName, phoneNumber, bio}: any,
    {setSubmitting}: any,
  ) => {
    const params = {
      firstname: firstName,
      lastname: lastName,
      phonenumber: phoneNumber,
      DOB: DOB,
      bio: bio,
    };
    editUserProfile(params)
      .then(({data}: any) => {
        let obj = {
          ...user,
          user: data,
        };
        dispatch(setUser(obj));
        showToast('Success', 'Profile Updated Successfully!', true);
      })
      .catch(err => {
        console.log('err', err);
        showToast('Request Failed', err?.response.data, false);
      })
      .finally(() => {
        setSubmitting(false);
        setModalVisible(!modalVisible);
      });
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
            <Header
              title={'Edit Profile'}
              leftText={'Cancel'}
              rightText={'Done'}
              rightAction={() => setModalVisible(false)}
              backAction={() => setModalVisible(false)}
            />
            <View style={styles.mainContainer}>
              <Formik
                initialValues={initialValues}
                validationSchema={EditProfileVS}
                onSubmit={submitHandler}>
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  isSubmitting,
                }) => (
                  <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'never'}>
                    <TouchableOpacity
                      onPress={toggleOverlay}
                      style={[
                        {
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        },
                        GST.mb4,
                      ]}>
                      <FastImage
                        source={
                          values?.avatar
                            ? {uri: PHOTO_URL + values?.avatar}
                            : profilePlaceholder
                        }
                        style={[styles.profilePhoto]}
                      />
                      <CustomText size={12} color={COLORS.PRIMARY}>
                        Change profile photo
                      </CustomText>
                    </TouchableOpacity>

                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Input
                        mainContainerStyle={GST.w50}
                        title={'First Name'}
                        textContentType={'name'}
                        value={values.firstName}
                        autoCapitalize={'none'}
                        placeholder={'First Name'}
                        keyboardType="default"
                        onChangeText={handleChange('firstName')}
                        error={
                          touched.firstName && errors.firstName
                            ? errors.firstName
                            : ''
                        }
                        inputStyle={[styles.inputStyle]}
                        containerStyle={styles.inputContainer}
                        titleSize={12}
                      />
                      <Input
                        mainContainerStyle={[GST.w50, GST.pl1]}
                        title={'Last Name'}
                        textContentType={'name'}
                        value={values.lastName}
                        autoCapitalize={'none'}
                        placeholder={'Last Name'}
                        keyboardType="default"
                        onChangeText={handleChange('lastName')}
                        error={
                          touched.lastName && errors.lastName
                            ? errors.lastName
                            : ''
                        }
                        inputStyle={[styles.inputStyle]}
                        containerStyle={styles.inputContainer}
                        titleSize={12}
                      />
                    </View>

                    <Input
                      title={'Phone Number'}
                      textContentType={'telephoneNumber'}
                      value={values.phoneNumber}
                      autoCapitalize={'none'}
                      placeholder={'Phone Number'}
                      keyboardType="phone-pad"
                      onChangeText={handleChange('phoneNumber')}
                      error={
                        touched.phoneNumber && errors.phoneNumber
                          ? errors.phoneNumber
                          : ''
                      }
                      inputStyle={[styles.inputStyle]}
                      containerStyle={styles.inputContainer}
                      titleSize={12}
                    />
                    <CustomDatePicker
                      title={'Date of Birth'}
                      value={values.DOB}
                      onChange={setFieldValue}
                      error={touched.DOB && errors.DOB ? errors.DOB : ''}
                      containerStyle={styles.inputContainer}
                      inputStyle={[{fontSize: RF(13)}]}
                      titleSize={12}
                    />
                    <Input
                      title={'Bio'}
                      textContentType={'name'}
                      value={values.bio}
                      autoCapitalize={'sentences'}
                      placeholder={'Bio'}
                      keyboardType="default"
                      onChangeText={handleChange('bio')}
                      multiline
                      error={touched.bio && errors.bio ? errors.bio : ''}
                      inputStyle={[styles.inputStyle]}
                      containerStyle={styles.inputContainer}
                      titleSize={12}
                    />
                    <PrimaryBtn
                      disabled={!editProfileDisableHandler(values)}
                      title={'Save'}
                      onPress={handleSubmit}
                      titleSize={13}
                      customStyle={[styles.customBtn]}
                      customContainerStyle={[styles.btnContainer]}
                    />
                    <CustomLoading visible={isSubmitting} />
                  </KeyboardAwareScrollView>
                )}
              </Formik>
              <EditOverlay
                visible={overlayVisible}
                toggleOverlay={toggleOverlay}
                openGallery={openGallery}
                openCamera={openCamera}
              />
            </View>
          </Wrapper>
        </View>
      </Modal>
    </View>
  );
};

export default EditProfile;
