import {
  homeActive,
  homeInactive,
  notification,
  searchIcon,
  tabPlusIcon,
} from '@assets/icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '@theme/colors';
import {RF} from '@theme/responsive';
import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import NotificationStack from '../mainStack/chatStack';
import FeedStack from '../mainStack/homeStack';
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
  const {hideTabBar} = useSelector((state: any) => state.root.blackReducer);
  const [unReadMsgCount, setUnReadMsgCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {}, [hideTabBar]);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: BLACK,
        tabBarInactiveTintColor: LIGHT_GRAY,
        tabBarShowLabel: false,
        tabBarStyle: hideTabBar
          ? styles.tabBarStylehide
          : styles.tabBarStyleFlex,
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="FeedStack"
        component={FeedStack}
        // listeners={{
        //   tabPress: () => dispatch(setHomeTabPressed(true)),
        // }}
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
        name="PostStack"
        component={PostStack}
        options={{
          tabBarIcon: () => <TabBarIcon source={tabPlusIcon} color={WHITE} />,
          tabBarButton: props => <CustomTabBarButton {...props} />,
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
        name="NotificationStack"
        component={NotificationStack}
        options={{
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon source={notification} color={color} />
          ),
          tabBarBadge: unReadMsgCount || undefined,
          tabBarBadgeStyle: {top: RF(12)},
        }}
      />
    </Tab.Navigator>
  );
};

const TabBarIcon = ({
  source,
  size = 20,
  color,
}: {
  source: Source;
  size?: number;
  color: string;
}) => (
  <FastImage
    source={source}
    style={{width: RF(size), height: RF(size)}}
    tintColor={color}
    resizeMode={'contain'}
  />
);

export default MyTabs;

const styles = StyleSheet.create({
  tabBarStyleFlex: {
    backgroundColor: WHITE,
    height: RF(80),
    display: 'flex',
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
    // top: -RF(5),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: RF(20),
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,
    // elevation: 10,
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
    marginTop: RF(10),
  },
});
