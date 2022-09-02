// import MessageToast from '@hooks/messageToast';
import {NavigationContainer} from '@react-navigation/native';
import {persistor, store} from '@redux/store';
import {navigationRef} from '@services/navService';
import {initialConfig} from '@utils/config';
import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Routes from './src/routes';
// // @ts-ignore
// navigator.geolocation = require('react-native-geolocation-service');

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested',
  'Require cycle: node_modules/victory',
  '`renderInPortal` is not supported ',
]);
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    initialConfig();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <Routes />
            <Toast position={'bottom'} />
            {/* <MessageToast /> */}
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
