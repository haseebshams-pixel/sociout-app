import {Platform} from 'react-native';

const ANDROID: any = Platform.OS === 'android';
const IOS: any = Platform.OS === 'ios';

let HEADERS: any = {
  'Content-Type': 'multipart/form-data,octet-stream',
  // 'Transfer-Encoding': 'Chunked',
};

export {HEADERS, ANDROID, IOS};
