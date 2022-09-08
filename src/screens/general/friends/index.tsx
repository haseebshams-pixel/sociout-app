//import liraries
import {profilePlaceholder} from '@assets/images';
import CustomText from '@components/customText';
import Header from '@components/header';
import PrimaryBtn from '@components/primaryBtn';
import Wrapper from '@components/wrapper';
import {resetFriends, setFriends} from '@redux/reducers/friendsSlice';
import {setRequests} from '@redux/reducers/requestsSlice';
import {showToast} from '@services/helperService';
import {
  acceptRequest,
  getFriendShipStatus,
  getUserFriends,
  rejectRequest,
  removeFriend,
  sendRequest,
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

const Item = ({item, navigation, user, id}: any) => {
  const [status, setStatus] = useState<any>('');
  const [status2, setStatus2] = useState<any>('friend');
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const {friends, requests} = useSelector((state: any) => state.root);
  const dispatch = useDispatch();
  const handleRemove = () => {
    setLoader(true);
    removeFriend(item?._id)
      .then(({res}: any) => {
        setStatus('notfriend');
        setStatus2('notfriend');
        if (user?.id != id) {
          var filterArr = friends?.friends?.filter((itm: any) => {
            return itm?._id != item?._id;
          });
          dispatch(setFriends({friends: filterArr}));
        }
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
        setStatus('requested');
        setStatus2('requested');
        showToast('Success', 'Request Sent', true);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const handleReject = () => {
    setLoader2(true);
    rejectRequest(item?._id)
      .then(({res}: any) => {
        var filterArr = requests?.requests?.filter((itm: any) => {
          return itm?._id != item?._id;
        });
        dispatch(setRequests({requests: filterArr}));
        setStatus('rejected');
        showToast('Success', 'Friend Request Rejected', true);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setLoader2(false);
      });
  };
  const handleConfirm = () => {
    setLoader(true);
    acceptRequest(item?._id)
      .then(({res}: any) => {
        setStatus('accepted');
        var filterArr = requests?.requests?.filter((itm: any) => {
          return itm?._id != item?._id;
        });
        var temp = [...friends?.friends];
        temp.push(item);
        dispatch(setFriends({friends: temp}));
        dispatch(setRequests({requests: filterArr}));
        showToast('Success', 'Friend Request Accepted', true);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const fetchFriendShipStatus = async (id: string) => {
    getFriendShipStatus(id)
      .then(({data}: any) => {
        setStatus(data.state);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    fetchFriendShipStatus(item?._id);
  }, []);

  return (
    <View style={[styles.renderContainer]}>
      <TouchableOpacity
        style={[GST.FLEX_ROW]}
        onPress={() =>
          navigation.push(ROUTES.PROFILE, {
            id: item?._id,
            prevScreen: ROUTES.FRIENDS,
          })
        }>
        <FastImage
          source={item?.avatar ? {uri: item?.avatar} : profilePlaceholder}
          style={[styles.profilePic]}
        />
        <View style={[GST.ml3, {width: WP(40)}]}>
          <CustomText size={14} bold>
            {item?.firstname} {item?.lastname}
          </CustomText>
          {item?.bio && (
            <CustomText size={12} numberOfLines={1}>
              {item?.bio}
            </CustomText>
          )}
        </View>
      </TouchableOpacity>
      {user?.id == id ? (
        status2 == 'friend' ? (
          <PrimaryBtn
            title="Remove"
            onPress={() => handleRemove()}
            loader={loader}
            loaderColor={COLORS.WHITE}
            customStyle={[styles.removeBTN]}
            titleSize={12}
          />
        ) : status2 == 'notfriend' ? (
          <PrimaryBtn
            title="Add"
            onPress={() => handleAdd()}
            loader={loader}
            loaderColor={COLORS.WHITE}
            customStyle={[styles.addBTN]}
            titleSize={12}
          />
        ) : (
          status2 == 'requested' && (
            <PrimaryBtn
              title="Requested"
              disabled
              customStyle={[styles.requestBTN]}
              titleSize={12}
            />
          )
        )
      ) : status == 'friend' ? (
        <PrimaryBtn
          title="Remove"
          onPress={() => handleRemove()}
          loader={loader}
          loaderColor={COLORS.WHITE}
          customStyle={[styles.removeBTN]}
          titleSize={12}
        />
      ) : status == 'notfriend' ? (
        <PrimaryBtn
          title="Add"
          onPress={() => handleAdd()}
          loader={loader}
          loaderColor={COLORS.WHITE}
          customStyle={[styles.addBTN]}
          titleSize={12}
        />
      ) : status == 'requested' ? (
        <PrimaryBtn
          title="Requested"
          disabled
          customStyle={[styles.requestBTN]}
          titleSize={12}
        />
      ) : status == 'pending' ? (
        <>
          <PrimaryBtn
            title="Confirm"
            customStyle={[styles.confirmBTN]}
            loader={loader}
            onPress={() => handleConfirm()}
            loaderColor={COLORS.WHITE}
            titleSize={12}
          />
          <PrimaryBtn
            title="Reject"
            loader={loader2}
            onPress={() => handleReject()}
            loaderColor={COLORS.WHITE}
            customStyle={[styles.rejectBTN]}
            titleSize={12}
          />
        </>
      ) : status == 'accepted' ? (
        <PrimaryBtn
          title="Accepted"
          disabled
          customStyle={[styles.acceptedBTN]}
          titleSize={12}
        />
      ) : status == 'rejected' ? (
        <PrimaryBtn
          title="Rejected"
          disabled
          customStyle={[styles.rejectedBTN]}
          titleSize={12}
        />
      ) : (
        status == '' && (
          <PrimaryBtn
            title=""
            disabled={status == ''}
            loader
            loaderColor={COLORS.WHITE}
            customStyle={[styles.addBTN]}
            titleSize={14}
          />
        )
      )}
    </View>
  );
};

const Friends = ({route, navigation}: any) => {
  const [currentFriends, setCurrentFriends] = useState<any>(
    route?.params?.friends,
  );
  const {user, friends} = useSelector((state: any) => state.root);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState<boolean>(false);

  const getFriends = () => {
    if (route?.params?.id === user?.user?.id) {
      dispatch(resetFriends());
    } else {
      setCurrentFriends([]);
    }
    setRefresh(true);
    getUserFriends(route?.params.id)
      .then(({data}: any) => {
        if (route?.params?.id === user?.user?.id) {
          dispatch(setFriends({friends: data}));
        } else {
          setCurrentFriends(data);
        }
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
      <Header title={'Friends'} leftIcon />
      <View style={[styles.container]}>
        <FlatList
          data={
            route?.params?.id == user?.user?.id
              ? friends?.friends
              : currentFriends
          }
          renderItem={item => (
            <Item
              item={item?.item}
              navigation={navigation}
              user={user?.user}
              id={route?.params?.id}
            />
          )}
          ItemSeparatorComponent={() => <View style={[GST.mt3]} />}
          refreshing={refresh}
          onRefresh={() => {
            getFriends();
          }}
        />
      </View>
    </Wrapper>
  );
};
//make this component available to the app
export default Friends;
