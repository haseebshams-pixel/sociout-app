//import liraries
import {NotFoundAnim} from '@assets/animations';
import {settingIcon} from '@assets/icons';
import {profilePlaceholder} from '@assets/images';
import LotieAnimation from '@components/animation';
import CustomAlert from '@components/customAlert';
import CustomLoading from '@components/customLoading';
import CustomText from '@components/customText';
import Header from '@components/header';
import PostCard from '@components/postCard';
import PrimaryBtn from '@components/primaryBtn';
import Wrapper from '@components/wrapper';
import ProfileLoader from '@loaders/profileLoader';
import UserInfoLoader from '@loaders/userInfoLoader';
import {resetFriends, setFriends} from '@redux/reducers/friendsSlice';
import {resetRequests, setRequests} from '@redux/reducers/requestsSlice';
import {showToast} from '@services/helperService';
import {navigate} from '@services/navService';
import {
  acceptRequest,
  getFriendShipStatus,
  getUser,
  getUserFriends,
  getUserPost,
  getUserSocialNetwork,
  rejectRequest,
  removeFriend,
  sendRequest,
} from '@services/userService';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {PHOTO_URL} from '@utils/endpoints';
import {ROUTES} from '@utils/routes';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Animated, StatusBar, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import EditProfile from './editProfileModal';
import {styles} from './styles';
// create a component
const Profile = ({route, navigation}: any) => {
  //states
  const {user, friends, requests} = useSelector((state: any) => state.root);
  const [posts, setPosts] = useState<any>([]);
  const [skip, setSkip] = useState<number>(0);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [currentUserFriends, setCurrentFriends] = useState<any>([]);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [userLoader, setUserLoader] = useState<boolean>(false);
  const [friendShipStatus, setFriendShipStatus] = useState<string>('');
  const [loader2, setLoader2] = useState<boolean>(false);
  const [rejectLoader, setRejectLoader] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  //modalize functions

  //apis
  const getPosts = (id: string, skip: number, isRefreshing: boolean) => {
    getUserPost(id, skip)
      .then(({data}: any) => {
        if (data.length < 3) {
          setLoadMore(false);
        } else {
          setLoadMore(true);
        }
        if (isRefreshing) {
          setPosts(data);
        } else {
          setPosts((p: string | any[]) => {
            return p.concat(data);
          });
        }
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setLoader(false);
        setRefresh(false);
      });
  };

  const getSocialNetwork = (id: string) => {
    dispatch(resetFriends());
    dispatch(resetRequests());
    getUserSocialNetwork(id)
      .then(({data}: any) => {
        dispatch(setFriends({friends: data?.friends}));
        dispatch(setRequests({requests: data?.pending}));
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setRefresh(false);
      });
  };

  const getFriends = (id: string) => {
    setCurrentFriends([]);
    getUserFriends(route?.params.id)
      .then(({data}: any) => {
        setCurrentFriends(data);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {});
  };

  const fetchUser = async (id: string) => {
    setUserLoader(true);
    getUser(id)
      .then(({data}: any) => {
        setCurrentUser(data);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setUserLoader(false);
      });
  };

  const fetchFriendShipStatus = async (id: string) => {
    getFriendShipStatus(id)
      .then(({data}: any) => {
        setFriendShipStatus(data.state);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {});
  };

  const getRouteUserData = async () => {
    Promise.all([
      getFriendShipStatus(route?.params?.id),
      getFriends(route?.params?.id),
      fetchUser(route?.params?.id),
      getPosts(route?.params?.id, 0, true),
    ]).finally(() => {
      setRefresh(false);
    });
  };

  const getUserData = async () => {
    Promise.all([
      getSocialNetwork(route?.params?.id),
      fetchUser(route?.params?.id),
      getPosts(route?.params?.id, 0, true),
    ]).finally(() => {
      setRefresh(false);
    });
  };

  const handleRemove = () => {
    setOpenAlert(false);
    setRejectLoader(true);
    removeFriend(route?.params?.id)
      .then(({res}: any) => {
        setFriendShipStatus('notfriend');
        var filterArr = friends?.friends?.filter((item: any) => {
          return item?._id != route?.params?.id;
        });
        dispatch(setFriends({friends: filterArr}));
        showToast('Success', 'Friend Removed', true);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setRejectLoader(false);
      });
  };

  const handleAdd = () => {
    setLoader2(true);
    sendRequest(route?.params?.id)
      .then(({res}: any) => {
        setFriendShipStatus('requested');
        showToast('Success', 'Request Sent', true);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setLoader2(false);
      });
  };

  const handleReject = () => {
    setRejectLoader(true);
    rejectRequest(route?.params?.id)
      .then(({res}: any) => {
        setFriendShipStatus('notfriend');
        var filterArr = requests?.requests?.filter((item: any) => {
          return item?._id != route?.params?.id;
        });
        dispatch(setRequests({requests: filterArr}));
        showToast('Success', 'Friend Request Rejected', true);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setRejectLoader(false);
      });
  };

  const handleConfirm = () => {
    setLoader2(true);
    acceptRequest(route?.params?.id)
      .then(({res}: any) => {
        setFriendShipStatus('friend');
        var filterArr = requests?.requests?.filter((item: any) => {
          return item?._id != route?.params?.id;
        });
        var temp = [...friends?.friends];
        temp.push(currentUser);
        dispatch(setFriends({friends: temp}));
        dispatch(setRequests({requests: filterArr}));
        showToast('Success', 'Friend Request Accepted', true);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setLoader2(false);
      });
  };

  //Components for flatlist
  const HeaderComponent = () => {
    return (
      <>
        <View style={[styles.headerContainer, GST.pl3, GST.pr3]}>
          <View style={[GST.FLEX_ROW, GST.mb2]}>
            {userLoader ? (
              <ProfileLoader />
            ) : (
              <FastImage
                source={
                  route?.params?.id == user?.user?.id
                    ? user?.user?.avatar
                      ? {uri: PHOTO_URL + user?.user?.avatar}
                      : profilePlaceholder
                    : currentUser?.avatar
                    ? {uri: PHOTO_URL + currentUser?.avatar}
                    : profilePlaceholder
                }
                style={[styles.profilePhoto]}
              />
            )}

            <View
              style={[
                styles.userInfoContainer,
                user?.user?.id == route?.params?.id
                  ? {justifyContent: 'space-between'}
                  : {justifyContent: 'space-evenly'},
              ]}>
              <View style={[{alignItems: 'center'}]}>
                <CustomText size={14} bold>
                  {posts?.length}
                </CustomText>
                <CustomText size={14}>Posts</CustomText>
              </View>
              <TouchableWithoutFeedback
                style={[{alignItems: 'center'}]}
                disabled={
                  route?.params?.id == user?.user?.id
                    ? friends?.friends?.length < 1
                    : currentUserFriends?.length < 1
                }
                onPress={() =>
                  navigation.push(ROUTES.FRIENDS, {
                    friends: currentUserFriends,
                    id: route?.params?.id,
                  })
                }>
                <CustomText size={14} bold>
                  {route?.params?.id == user?.user?.id
                    ? friends?.friends?.length
                    : currentUserFriends?.length}
                </CustomText>
                <CustomText size={14}>Friends</CustomText>
              </TouchableWithoutFeedback>
              {user?.user?.id == route?.params?.id && (
                <TouchableWithoutFeedback
                  style={[{alignItems: 'center'}]}
                  onPress={() =>
                    navigate(ROUTES.REQUESTS, {
                      id: route?.params?.id,
                    })
                  }
                  disabled={requests?.requests?.length < 1}>
                  <CustomText size={14} bold>
                    {requests?.requests?.length}
                  </CustomText>
                  <CustomText size={14}>Requests</CustomText>
                </TouchableWithoutFeedback>
              )}
            </View>
          </View>
          {userLoader ? (
            <UserInfoLoader />
          ) : (
            <>
              <CustomText size={14} style={[GST.mb1]} bold>
                {route?.params?.id == user?.user?.id
                  ? user?.user?.firstname + ' ' + user?.user?.lastname
                  : currentUser?.firstname + ' ' + currentUser?.lastname}
              </CustomText>

              {currentUser?.bio && (
                <CustomText size={13}>
                  {route?.params?.id == user?.user?.id
                    ? user?.user?.bio
                    : currentUser?.bio}
                </CustomText>
              )}
            </>
          )}
          {user?.user?.id == route?.params?.id ? (
            <PrimaryBtn
              title="Edit Profile"
              titleSize={14}
              onPress={() => setModalVisible(true)}
              customStyle={[styles.editbtn]}
            />
          ) : friendShipStatus == 'notfriend' ? (
            <PrimaryBtn
              title="Add Friend"
              titleSize={15}
              loader={loader2}
              customStyle={[styles.editbtn]}
              onPress={() => handleAdd()}
            />
          ) : friendShipStatus == 'friend' ? (
            <View style={[GST.FLEX_ROW_SPACE]}>
              <PrimaryBtn
                title="Message"
                titleSize={15}
                loader={loader2}
                customStyle={[styles.confirmbtn]}
              />
              <PrimaryBtn
                title="Remove"
                titleSize={15}
                loader={rejectLoader}
                customStyle={[styles.removebtn]}
                onPress={() => setOpenAlert(true)}
              />
            </View>
          ) : friendShipStatus == 'requested' ? (
            <PrimaryBtn
              title="Requested"
              disabled
              titleSize={14}
              customStyle={[styles.editbtn]}
            />
          ) : friendShipStatus == 'pending' ? (
            <View style={[GST.FLEX_ROW_SPACE]}>
              <PrimaryBtn
                title="Confirm"
                titleSize={14}
                loader={loader2}
                onPress={() => handleConfirm()}
                customStyle={[styles.confirmbtn]}
              />
              <PrimaryBtn
                title="Remove"
                titleSize={14}
                loader={rejectLoader}
                onPress={() => handleReject()}
                customStyle={[styles.rejectbtn]}
              />
            </View>
          ) : (
            <PrimaryBtn
              disabled={friendShipStatus == ''}
              titleSize={25}
              loader
              customStyle={[styles.editbtn]}
            />
          )}
        </View>
      </>
    );
  };

  const EmptyComponent = () => {
    return (
      <>
        {!loader && posts?.length == 0 && !refresh && (
          <View style={[styles.listHeader]}>
            <LotieAnimation Pic={NotFoundAnim} Message={'No Posts Found!'} />
          </View>
        )}
      </>
    );
  };

  const FooterComponent = () => {
    if (loadMore && !refresh && !loader) {
      return <ActivityIndicator color={COLORS.BLACK} size="large" />;
    } else {
      return null;
    }
  };

  //useEffects
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (user?.user?.id != route?.params?.id) {
        fetchFriendShipStatus(route?.params?.id);
        getFriends(route?.params?.id);
      } else {
        getSocialNetwork(route?.params?.id);
      }
      setLoader(true);
      setPosts([]);
      fetchUser(route?.params?.id);
      getPosts(route?.params?.id, 0, false);
      setSkip(0);
    });

    return unsubscribe;
  }, [navigation, route?.params?.id]);

  return (
    <Wrapper noPaddingBottom>
      <StatusBar translucent barStyle={'dark-content'} />
      <Header
        title={'Profile'}
        rightIcon={user?.user?.id == route?.params?.id ? settingIcon : null}
        leftIcon
        onPress={() => navigate(ROUTES.SETTING)}
      />
      <View style={[GST.FLEX, styles.container]}>
        <>
          <Animated.FlatList
            keyExtractor={(_, index) => String(index)}
            renderItem={({item}: any) => (
              <PostCard item={item} navigation={navigation} />
            )}
            data={posts}
            initialNumToRender={10}
            onEndReached={() => {
              if (!refresh && loadMore) {
                let k = skip + 3;
                setSkip(k);
                getPosts(route?.params?.id, k, false);
              }
            }}
            refreshing={refresh}
            onRefresh={() => {
              setRefresh(true);
              setSkip(0);
              if (user?.user?.id != route?.params?.id) {
                getRouteUserData();
              } else {
                getUserData();
              }
            }}
            ListHeaderComponent={HeaderComponent}
            ListEmptyComponent={EmptyComponent}
            ListFooterComponent={FooterComponent}
          />
        </>
      </View>
      <CustomAlert
        open={openAlert}
        closeAlert={() => setOpenAlert(false)}
        title={'Remove Friend'}
        desc={'Are you sure you want to remove this friend? '}
        actionBtnTitle={'Yes, Remove'}
        action={handleRemove}
      />
      <EditProfile
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <CustomLoading visible={loader} />
    </Wrapper>
  );
};
//make this component available to the app
export default Profile;
