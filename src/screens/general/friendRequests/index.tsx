//import liraries
import {profilePlaceholder} from '@assets/images';
import CustomText from '@components/customText';
import Header from '@components/header';
import PrimaryBtn from '@components/primaryBtn';
import Wrapper from '@components/wrapper';
import {resetRequests, setRequests} from '@redux/reducers/requestsSlice';
import {showToast} from '@services/helperService';
import {
  acceptRequest,
  getUserRequests,
  rejectRequest,
} from '@services/userService';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF, WP} from '@theme/responsive';
import {ROUTES} from '@utils/routes';
import React, {useEffect, useState} from 'react';
import {StatusBar, TouchableOpacity, View, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';

import {styles} from './styles';
// create a component

const Item = ({item, navigation}: any) => {
  const [status, setStatus] = useState<any>('pending');
  const [removeLoader, setRemoveLoader] = useState(false);
  const [confirmLoader, setConfirmLoader] = useState(false);

  const handleRemove = () => {
    setRemoveLoader(true);
    rejectRequest(item?._id)
      .then(({res}: any) => {
        setStatus('rejected');
        showToast('Success', 'Friend Request Rejected', true);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setRemoveLoader(false);
      });
  };
  const handleConfirm = () => {
    setConfirmLoader(true);
    acceptRequest(item?._id)
      .then(({res}: any) => {
        setStatus('accepted');
        showToast('Success', 'Friend Request Accepted', true);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setConfirmLoader(false);
      });
  };

  return (
    <View style={[styles.renderContainer]}>
      <TouchableOpacity
        style={[GST.FLEX_ROW]}
        onPress={() =>
          navigation.push(ROUTES.PROFILE, {
            id: item?._id,
            prevScreen: ROUTES.REQUESTS,
          })
        }>
        <FastImage
          source={item?.avatar ? {uri: item?.avatar} : profilePlaceholder}
          style={[styles.profilePic]}
        />
        <View style={[GST.ml3, {width: WP(40)}]}>
          <CustomText size={14} bold numberOfLines={1}>
            {item?.firstname} {item?.lastname}
          </CustomText>
          {item?.bio && (
            <CustomText size={12} numberOfLines={1}>
              {item?.bio}
            </CustomText>
          )}
        </View>
      </TouchableOpacity>
      {status == 'accepted' ? (
        <PrimaryBtn
          title="Accepted"
          disabled
          customStyle={[styles.acceptedBTN]}
          titleSize={13}
        />
      ) : status == 'pending' ? (
        <>
          <PrimaryBtn
            title="Confirm"
            onPress={() => handleConfirm()}
            loader={confirmLoader}
            loaderColor={COLORS.WHITE}
            customStyle={[styles.addBTN]}
            titleSize={12}
          />
          <PrimaryBtn
            title="Remove"
            onPress={() => handleRemove()}
            loader={removeLoader}
            loaderColor={COLORS.WHITE}
            customStyle={[styles.removeBTN]}
            titleSize={12}
          />
        </>
      ) : (
        status == 'rejected' && (
          <PrimaryBtn
            title="Rejected"
            disabled
            customStyle={[styles.rejectedBTN]}
            titleSize={13}
          />
        )
      )}
    </View>
  );
};

const FriendRequests = ({route, navigation}: any) => {
  // const [requests, setRequests] = useState<any>(route?.params?.requests);
  const {user, requests} = useSelector((state: any) => state.root);
  const [refresh, setRefresh] = useState<boolean>(false);
  const dispatch = useDispatch();

  const getRequests = () => {
    dispatch(resetRequests());
    setRefresh(true);
    getUserRequests()
      .then(({data}: any) => {
        dispatch(setRequests({requests: data}));
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setRefresh(false);
      });
  };

  return (
    <Wrapper>
      <StatusBar translucent barStyle={'dark-content'} />
      <Header title={'Requests'} leftIcon />
      <View style={[styles.container]}>
        <FlatList
          data={requests?.requests}
          renderItem={item => (
            <Item item={item?.item} navigation={navigation} />
          )}
          ItemSeparatorComponent={() => <View style={[GST.mt3]} />}
          refreshing={refresh}
          onRefresh={() => {
            getRequests();
          }}
        />
      </View>
    </Wrapper>
  );
};
//make this component available to the app
export default FriendRequests;
