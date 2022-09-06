//import liraries
import {settingIcon} from '@assets/icons';
import {profilePlaceholder} from '@assets/images';
import CustomText from '@components/customText';
import Header from '@components/header';
import PrimaryBtn from '@components/primaryBtn';
import {HeaderComponent} from '@components/searchHeader';
import Wrapper from '@components/wrapper';
import {navigate} from '@services/navService';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF, WP} from '@theme/responsive';
import {ROUTES} from '@utils/routes';
import React from 'react';
import {StatusBar, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {styles} from './styles';
// create a component
const Profile = ({route}: any) => {
  const {user} = useSelector((state: any) => state.root.user);

  return (
    <Wrapper noPaddingBottom>
      <StatusBar translucent barStyle={'dark-content'} />
      <Header
        title={'Profile'}
        rightIcon={settingIcon}
        onPress={() => navigate(ROUTES.SETTING)}
      />
      <View style={[GST.FLEX, styles.container]}>
        <View style={[styles.headerContainer, GST.pl3, GST.pr3]}>
          <View style={[GST.FLEX_ROW, GST.mb3]}>
            <FastImage
              source={user?.avatar ? {uri: user?.avatar} : profilePlaceholder}
              style={[styles.profilePhoto]}
            />
            <View style={[styles.userInfoContainer]}>
              <View style={[{alignItems: 'center'}]}>
                <CustomText size={15} bold>
                  4
                </CustomText>
                <CustomText size={15}>Posts</CustomText>
              </View>
              <View style={[{alignItems: 'center'}]}>
                <CustomText size={15} bold>
                  5
                </CustomText>
                <CustomText size={15}>Friends</CustomText>
              </View>
            </View>
          </View>
          <CustomText size={15} style={[GST.mb1]}>
            {user?.firstname} {user?.lastname}
          </CustomText>
          <CustomText size={14}>{user?.bio}</CustomText>
          <PrimaryBtn
            title="Edit Profile"
            titleSize={14}
            customStyle={[styles.editbtn]}
          />
        </View>
      </View>
    </Wrapper>
  );
};
//make this component available to the app
export default Profile;
