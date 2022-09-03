import {Alert, Dimensions} from 'react-native';
import Toast from 'react-native-toast-message';

const getWidth = () => {
  return Dimensions.get('window').width;
};
const displayAlert = (
  title: string,
  message: string,
  isCancellable: Boolean,
  okAction: any,
) => {
  Alert.alert(
    title,
    message,
    isCancellable
      ? [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: okAction},
        ]
      : [{text: 'OK', onPress: okAction}],
  );
};
const disableHandler = (value: any) => {
  return value?.email && value?.password ? true : false;
};
const signUpDisableHandler = (value: any) => {
  return value?.email &&
    value?.password &&
    value.confirmPassword &&
    value.firstName &&
    value.lastName &&
    value.phoneNumber &&
    value.DOB
    ? true
    : false;
};
const showToast = (text1: string, text2: string, type: boolean) => {
  Toast.show({text1, text2, type: type ? 'success' : 'error'});
};

export {
  disableHandler,
  getWidth,
  showToast,
  displayAlert,
  signUpDisableHandler,
};
