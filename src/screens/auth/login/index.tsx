import AuthHeader from '@components/authHeader';
import CustomLoading from '@components/customLoading';
import CustomText from '@components/customText';
import Header from '@components/header';
import Input from '@components/input';
import PrimaryBtn from '@components/primaryBtn';
import Wrapper from '@components/wrapper';
import {setUser} from '@redux/reducers/userSlice';
import {loginUser} from '@services/AuthService';
import {disableHandler, showToast} from '@services/helperService';
import {navigate} from '@services/navService';
import {COLORS} from '@theme/colors';
import {ANDROID} from '@utils/constants';
import {ROUTES} from '@utils/routes';
import {LoginVS} from '@utils/validations';
import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {Pressable, View, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
const {PRIMARY, PRIMARY_LIGHT} = COLORS;
const Login = ({navigation}: any) => {
  //// State handle
  const [showPassword, setShowPassword] = useState(false);
  const [state, setstate] = useState<boolean>(false);
  const dispatch = useDispatch();
  ////// Referance handle

  const initialValues = {
    userName: '',
    password: '',
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = (values: any, {setSubmitting}: any) => {
    // const {password} = values;
    // const identifier = values.userName?.trim();
    // const params = {
    //   Identifier: identifier,
    //   password,
    //   deviceId: fcmToken,
    //   isAndroid: String(ANDROID),
    // };
    // loginUser(params)
    //   .then(({data}: any) => {
    //     dispatch(setUser(data));
    //     const user = data.attorney;
    //     // navigate(PERSONAL_INFO);
    //     // return;
    //     switch (data.userType) {
    //       case USER_ROLE.ATTORNEY:
    //         user.fullName?.trim()
    //           ? user.contactInfo?.emailAddress
    //             ? user.educationalInfo?.lawSchool
    //               ? // ? user.professionalInfo.practiceAreas?.length > 0
    //                 user.professionalInfo.practiceAreas?.length > 0 &&
    //                 user.professionalInfo.practiceAreas[0] !== 'string'
    //                 ? user.biographicalInfo
    //                   ? user.subscriptionInfo
    //                     ? user.profile
    //                       ? dispatch(setUserSession(true))
    //                       : navigate(PROFILE_INFO)
    //                     : navigate(PACKAGE_PLAN)
    //                   : navigate(CULTURE_INFO)
    //                 : navigate(SKILL_INFO)
    //               : navigate(PROFESSIONAL_INFO)
    //             : navigate(CONTACT_INFO)
    //           : navigate(PERSONAL_INFO);
    //         break;
    //       case USER_ROLE.STUDENT:
    //         data.attorney.fullName
    //           ? user.educationalInfo?.lawSchool
    //             ? user.biographicalInfo
    //               ? user.profile
    //                 ? dispatch(setUserSession(true))
    //                 : navigate(PROFILE_INFO)
    //               : navigate(CULTURE_INFO)
    //             : navigate(SCHOOL_INFO)
    //           : navigate(PERSONAL_INFO);
    //         break;
    //       case USER_ROLE.MEMBER:
    //         data.attorney.fullName
    //           ? user.contactInfo?.emailAddress
    //             ? user.biographicalInfo
    //               ? user.profile
    //                 ? dispatch(setUserSession(true))
    //                 : navigate(PROFILE_INFO)
    //               : navigate(CULTURE_INFO)
    //             : navigate(CONTACT_INFO)
    //           : navigate(PERSONAL_INFO);
    //         break;
    //       case USER_ROLE.ALLY:
    //         data.attorney.fullName
    //           ? user.contactInfo?.emailAddress
    //             ? user.profile
    //               ? dispatch(setUserSession(true))
    //               : navigate(PROFILE_INFO)
    //             : navigate(CONTACT_INFO)
    //           : navigate(PERSONAL_INFO);
    //         break;
    //       default:
    //         data.emailAddress
    //           ? data.phoneConfirmed
    //             ? data.attorney.profile
    //               ? (navigation.reset({
    //                   index: 0,
    //                   routes: [{name: 'Drawer'}],
    //                 }),
    //                 dispatch(setUserSession(true)))
    //               : navigate('ProfileInfo')
    //             : navigate('VerifyPhone', {
    //                 mobilePhone: data.attorney.contactInfo.mobilePhoneNumber,
    //               })
    //           : navigate('ContactDetails');
    //     }
    //   })
    //   .catch(err => {
    //     showToast(
    //       'Request Failed',
    //       err?.response.data?.message?.join(', '),
    //       false,
    //     );
    //   })
    //   .finally(() => setSubmitting(false));
  };
  return (
    <Wrapper>
      <>
        <Header leftIcon />
        <View style={styles.mainContainer}>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginVS}
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
                keyboardShouldPersistTaps="never">
                <AuthHeader title={'Login'} />
                <Input
                  title={'Username'}
                  textContentType={'emailAddress'}
                  value={values.userName}
                  autoCapitalize={'none'}
                  placeholder={'Username'}
                  keyboardType="email-address"
                  onChangeText={handleChange('userName')}
                  error={
                    touched.userName && errors.userName ? errors.userName : ''
                  }
                />
                <Input
                  returnKeyType={'done'}
                  onSubmitEditing={handleSubmit}
                  value={values.password}
                  placeholder={'Password'}
                  textContentType={'password'}
                  title={'Password'}
                  onChangeText={handleChange('password')}
                  showPassword={showPassword}
                  toggleShowPassword={toggleShowPassword}
                  secureTextEntry={!showPassword}
                  error={
                    touched.password && errors.password ? errors.password : ''
                  }
                />
                <View style={styles.forgotBtnView}>
                  <Pressable onPress={() => navigate(ROUTES.FORGOT_PASSWORD)}>
                    <CustomText color={PRIMARY} style={styles.primaryText}>
                      Forgot Password?
                    </CustomText>
                  </Pressable>
                </View>
                <PrimaryBtn
                  disabled={!disableHandler(values)}
                  title={'Login'}
                  onPress={handleSubmit}
                />
                <CustomLoading visible={isSubmitting} />
              </KeyboardAwareScrollView>
            )}
          </Formik>
        </View>
      </>
    </Wrapper>
  );
};

export default Login;
