import AuthHeader from '@components/authHeader';
import CustomLoading from '@components/customLoading';
import CustomText from '@components/customText';
import Header from '@components/header';
import Input from '@components/input';
import PrimaryBtn from '@components/primaryBtn';
import Wrapper from '@components/wrapper';
import {RouteProp} from '@react-navigation/native';
import {setUser} from '@redux/reducers/userSlice';
import {registerUser} from '@services/AuthService';
import {disableHandler, showToast} from '@services/helperService';
import {navigate} from '@services/navService';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF} from '@theme/responsive';
import {ANDROID} from '@utils/constants';
import {ROUTES} from '@utils/routes';
import {RegistrationVS} from '@utils/validations';
import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
const SIZE = 5;
const {BLACK, SECONDARY_GRAY, SECONDARY_BLACK, RED} = COLORS;

interface Props {
  route: RouteProp<{
    params: {
      userRole: string;
      lawyerType: string;
    };
  }>;
}

const SignUp = ({route}: Props | any) => {
  const {userRole} = route.params;
  const [showPassword, setShowPassword] = useState(false);

  const [state, setState] = useState<boolean>(false);
  const dispatch = useDispatch();
  const initialValues = {
    userName: '',
    password: '',
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = ({userName, password}: any, {setSubmitting}: any) => {
    // const params = {
    //   firstName: 'firstName',
    //   middleName: 'middleName',
    //   lastName: 'lastName',
    //   userName: userName?.trim(),
    //   password,
    //   userRole,
    //   lawyerType: route.params.lawyerType || '',
    //   isAndroid: ANDROID,
    //   deviceId: fcmToken,
    // };
    // registerUser(params)
    //   .then(({data}: any) => {
    //     dispatch(setUser(data));
    //     navigate(ROUTES.VERIFICATION_PHONE);
    //   })
    //   .catch(err => {
    //     console.log('err', err);
    //     showToast(
    //       'Request Failed',
    //       err?.response.data?.message.join(', '),
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
            validationSchema={RegistrationVS}
            onSubmit={submitHandler}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={'never'}>
                <AuthHeader title={'Sign Up'} />
                <View style={{height: RF(SIZE * 3)}} />
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
                <View style={{height: RF(SIZE * 2)}} />
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
                  containerStyle={
                    touched.password && errors.password
                      ? GST.ERROR_CONTAINER
                      : {}
                  }
                />
                <CustomText
                  color={
                    touched.password && errors.password ? RED : SECONDARY_BLACK
                  }
                  style={GST.mb2}>
                  Must be 8-15 characters and may contain letters, numbers, or
                  special characters.
                </CustomText>
                <PrimaryBtn
                  disabled={!disableHandler(values)}
                  title={'Sign Up'}
                  onPress={handleSubmit}
                />
                <CustomLoading visible={isSubmitting} />
                <View style={styles.orContainer}>
                  <CustomText color={SECONDARY_GRAY} size={RF(14)}>
                    {'Or'}
                  </CustomText>
                </View>
                {/* <PrimaryBtn
                  bgColor={'transparent'}
                  title={'Sign Up with LinkedIn'}
                  leftIcon={linkedinIcon}
                  titleColor={BLACK}
                  titleSize={14}
                  customStyle={styles.socialBtnContainer}
                /> */}
                <CustomLoading visible={isSubmitting} />
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
