import {
  homeActive,
  homeInactive,
  notification,
  searchIcon,
  tabPlusIcon,
} from '@assets/icons';
import CreatePostModal from '@components/createPostModal';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Notifications from '@screens/general/notifications';
import {COLORS} from '@theme/colors';
import {RF} from '@theme/responsive';
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import {Briefcase} from 'react-native-feather';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import FeedStack from '../mainStack/homeStack';
import JobsStack from '../mainStack/job';
import PostStack from '../mainStack/postStack';
import SearchStack from '../mainStack/searchStack';

const {WHITE, LIGHT_GRAY, PRIMARY, BLACK} = COLORS;

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}: any) => (
  <Pressable style={styles.tabBarBtnMainContainer} onPress={onPress}>
    <View style={styles.btnContainer}>{children}</View>
  </Pressable>
);

const MyTabs = ({navigation}: any) => {
  const [unReadMsgCount, setUnReadMsgCount] = useState(0);
  const {bottomTab, user} = useSelector((state: any) => state.root);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}: any) => ({
          tabBarActiveTintColor: BLACK,
          tabBarInactiveTintColor: LIGHT_GRAY,
          tabBarShowLabel: false,
          tabBarStyle: !bottomTab?.isDisplay
            ? styles.tabBarStylehide
            : styles.tabBarStyleFlex,
          // tabBarStyle: styles.tabBarStyleFlex,
          headerShown: false,
          tabBarHideOnKeyboard: true,
        })}>
        <Tab.Screen
          name="FeedStack"
          component={FeedStack}
          options={{
            tabBarIcon: ({color, focused}) => (
              <TabBarIcon
                source={focused ? homeActive : homeInactive}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="SearchStack"
          component={SearchStack}
          options={{
            tabBarIcon: ({color}) => (
              <TabBarIcon source={searchIcon} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="PostStack"
          component={PostStack}
          options={{
            tabBarIcon: () => <TabBarIcon source={tabPlusIcon} color={WHITE} />,
            tabBarButton: props => <CustomTabBarButton {...props} />,
          }}
          listeners={({navigation}) => ({
            tabPress: e => {
              e.preventDefault();
              setModalVisible(true);
            },
          })}
        />

        <Tab.Screen
          name="NotificationStack"
          component={Notifications}
          options={{
            tabBarIcon: ({color, focused}) => (
              <TabBarIcon source={notification} color={color} />
            ),

            // tabBarBadge: unReadMsgCount || undefined,
            // tabBarBadgeStyle: {top: RF(12)},
          }}
        />
        <Tab.Screen
          name="JobsStack"
          component={JobsStack}
          options={{
            tabBarIcon: ({color, focused}) => (
              <Briefcase stroke={color} width={RF(22)} height={RF(22)} />
            ),
          }}
        />
      </Tab.Navigator>
      <CreatePostModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

const TabBarIcon = ({
  source,
  size = 20,
  color,
  onPress,
}: Partial<{
  source: Source;
  size?: number;
  color: string;
  onPress: any;
}>) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <FastImage
      source={source}
      style={{width: RF(size), height: RF(size)}}
      tintColor={color}
      resizeMode={'contain'}
    />
  </TouchableWithoutFeedback>
);

export default MyTabs;

const styles = StyleSheet.create({
  tabBarStyleFlex: {
    backgroundColor: WHITE,
    height: RF(80),
    // display: 'flex',
    elevation: 2,
    paddingBottom: RF(10),
  },
  tabBarStylehide: {
    backgroundColor: WHITE,
    height: RF(80),
    display: 'none',
    elevation: 2,
    paddingBottom: RF(10),
  },
  tabBarBtnMainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: RF(20),
  },
  tabBarBtnMainContainerClose: {
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    width: RF(46),
    height: RF(46),
    borderRadius: RF(30),
    backgroundColor: PRIMARY,
  },
  btnContainerClose: {
    width: RF(56),
    height: RF(56),
    borderRadius: RF(30),
    backgroundColor: 'red',
  },
  mt10: {
    // marginTop: RF(10),
  },
});
