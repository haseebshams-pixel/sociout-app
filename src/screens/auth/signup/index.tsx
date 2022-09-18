import AuthHeader from '@components/authHeader';
import CustomDatePicker from '@components/customDatePicker';
import CustomLoading from '@components/customLoading';
import Header from '@components/header';
import Input from '@components/input';
import PrimaryBtn from '@components/primaryBtn';
import Wrapper from '@components/wrapper';
import {setUser} from '@redux/reducers/userSlice';
import {registerUser} from '@services/authService';
import {showToast, signUpDisableHandler} from '@services/helperService';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import {RegistrationVS} from '@utils/validations';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useDispatch} from 'react-redux';
import styles from './styles';

const SIZE = 5;
const {SECONDARY_GRAY} = COLORS;

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    firstName: '',
    DOB: '',
    lastName: '',
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmShowPassword = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const submitHandler = (
    {email, password, DOB, firstName, lastName, phoneNumber}: any,
    {setSubmitting}: any,
  ) => {
    const params = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      phonenumber: phoneNumber,
      DOB: DOB,
    };
    registerUser(params)
      .then(({data}: any) => {
        let resp = {
          isLoggedIn: true,
          token: data.token,
          user: data.user,
        };
        setSubmitting(false);
        dispatch(setUser(resp));
        showToast('Success', 'User Logged In Successfully!', true);
      })
      .catch(err => {
        console.log('err', err);
        showToast('Request Failed', err?.response.data, false);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Wrapper>
      <>
        <Header leftIcon />
        <View style={styles.mainContainer}>
          <Formik
            initialValues={initialValues}
            validationSchema={RegistrationVS}
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
                <AuthHeader title={'Sign Up'} />
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
                      touched.lastName && errors.lastName ? errors.lastName : ''
                    }
                  />
                </View>
                <Input
                  title={'Email'}
                  textContentType={'emailAddress'}
                  value={values.email}
                  autoCapitalize={'none'}
                  placeholder={'Email'}
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  error={touched.email && errors.email ? errors.email : ''}
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
                <Input
                  returnKeyType={'done'}
                  onSubmitEditing={handleSubmit}
                  value={values.confirmPassword}
                  placeholder={'Confirm Password'}
                  textContentType={'password'}
                  title={'Confirm Password'}
                  onChangeText={handleChange('confirmPassword')}
                  showPassword={showConfirmPassword}
                  toggleShowPassword={toggleConfirmShowPassword}
                  secureTextEntry={!showConfirmPassword}
                  error={
                    touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
                      : ''
                  }
                />
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
                />
                <CustomDatePicker
                  title={'Date of Birth'}
                  value={values.DOB}
                  onChange={setFieldValue}
                  error={touched.DOB && errors.DOB ? errors.DOB : ''}
                />
                <PrimaryBtn
                  disabled={!signUpDisableHandler(values)}
                  title={'Sign Up'}
                  onPress={handleSubmit}
                />
                <CustomLoading visible={isSubmitting} />
                {/* <View style={styles.orContainer}>
                  <CustomText color={SECONDARY_GRAY} size={RF(14)}>
                    {'Or'}
                  </CustomText>
                </View> */}
                {/* <PrimaryBtn
                  bgColor={'transparent'}
                  title={'Sign Up with LinkedIn'}
                  leftIcon={linkedinIcon}
                  titleColor={BLACK}
                  titleSize={14}
                  customStyle={styles.socialBtnContainer}
                /> */}
              </KeyboardAwareScrollView>
            )}
          </Formik>
          <View style={{bottom: RF(SIZE * 2)}}></View>
        </View>
      </>
    </Wrapper>
  );
};
const Space = () => <View style={{paddingVertical: RF(10)}} />;
export default SignUp;
