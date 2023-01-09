import AuthHeader from '@components/authHeader';
import CustomLoading from '@components/customLoading';
import CustomText from '@components/customText';
import Header from '@components/header';
import Input from '@components/input';
import PrimaryBtn from '@components/primaryBtn';
import Wrapper from '@components/wrapper';
import {setUser} from '@redux/reducers/userSlice';
import {loginUser} from '@services/authService';
import {disableHandler, showToast} from '@services/helperService';
import {navigate} from '@services/navService';
import {COLORS} from '@theme/colors';
import {ROUTES} from '@utils/routes';
import {LoginVS} from '@utils/validations';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {Pressable, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import styles from './styles';

const {PRIMARY, PRIMARY_LIGHT} = COLORS;
const Login = ({navigation}: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = (values: any, {setSubmitting}: any) => {
    const params = {
      email: values.email,
      password: values.password,
    };
    loginUser(params)
      .then(({data}: any) => {
        let resp = {
          isLoggedIn: true,
          token: data.token,
          user: data.user,
        };
        dispatch(setUser(resp));
        setSubmitting(false);
        showToast('Success', 'User Logged In Successfully!', true);
      })
      .catch(err => {
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
                  // onSubmitEditing={handleSubmit}
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
