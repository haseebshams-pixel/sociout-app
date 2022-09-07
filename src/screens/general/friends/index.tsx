//import liraries
import {profilePlaceholder} from '@assets/images';
import CustomText from '@components/customText';
import Header from '@components/header';
import PrimaryBtn from '@components/primaryBtn';
import Wrapper from '@components/wrapper';
import {showToast} from '@services/helperService';
import {removeFriend, sendRequest} from '@services/userService';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF, WP} from '@theme/responsive';
import {ROUTES} from '@utils/routes';
import React, {useState} from 'react';
import {StatusBar, TouchableOpacity, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import FastImage from 'react-native-fast-image';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

import {styles} from './styles';
// create a component

const Item = ({item, navigation}: any) => {
  const [status, setStatus] = useState<any>('Friend');
  const [loader, setLoader] = useState(false);

  const handleRemove = () => {
    setLoader(true);
    removeFriend(item?._id)
      .then(({res}: any) => {
        setStatus('!Friend');
        showToast('Success', 'Friend Removed', true);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const handleAdd = () => {
    setLoader(true);
    sendRequest(item?._id)
      .then(({res}: any) => {
        setStatus('Requested');
        showToast('Success', 'Request Sent', true);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  return (
    <View style={[styles.renderContainer]}>
      <TouchableOpacity
        style={[GST.FLEX_ROW]}
        onPress={() => navigation.push(ROUTES.PROFILE, {id: item?._id})}>
        <FastImage
          source={item?.avatar ? {uri: item?.avatar} : profilePlaceholder}
          style={[styles.profilePic]}
        />
        <View style={[GST.ml3, {width: WP(50)}]}>
          <CustomText size={15} bold>
            {item?.firstname} {item?.lastname}
          </CustomText>
          {item?.bio && (
            <CustomText size={13} numberOfLines={1}>
              {item?.bio}
            </CustomText>
          )}
        </View>
      </TouchableOpacity>
      {status == 'Friend' ? (
        <PrimaryBtn
          title="Remove"
          onPress={() => handleRemove()}
          loader={loader}
          loaderColor={COLORS.WHITE}
          customStyle={[styles.removeBTN]}
          titleSize={14}
        />
      ) : status == '!Friend' ? (
        <PrimaryBtn
          title="Add"
          onPress={() => handleAdd()}
          loader={loader}
          loaderColor={COLORS.WHITE}
          customStyle={[styles.addBTN]}
          titleSize={14}
        />
      ) : (
        status == 'Requested' && (
          <PrimaryBtn
            title="Requested"
            disabled
            customStyle={[styles.requestBTN]}
            titleSize={12}
          />
        )
      )}
    </View>
  );
};

const Friends = ({route, navigation}: any) => {
  const [friends, setFriends] = useState<any>(route?.params);
  const {user} = useSelector((state: any) => state.root.user);
  return (
    <Wrapper>
      <StatusBar translucent barStyle={'dark-content'} />
      <Header title={'Friends'} leftIcon />
      <View style={[styles.container]}>
        <FlatList
          data={friends}
          renderItem={item => (
            <Item item={item?.item} navigation={navigation} />
          )}
          ItemSeparatorComponent={() => <View style={[GST.mt3]} />}
        />
      </View>
    </Wrapper>
  );
};
//make this component available to the app
export default Friends;
