//import liraries
import {settingIcon} from '@assets/icons';
import {profilePlaceholder} from '@assets/images';
import CustomText from '@components/customText';
import Header from '@components/header';
import PostCard from '@components/postCard';
import PrimaryBtn from '@components/primaryBtn';
import ShareModalize from '@components/shareModalize';
import Wrapper from '@components/wrapper';
import {resetBottomTab, setBottomTab} from '@redux/reducers/bottomTabSlice';
import {resetFriends, setFriends} from '@redux/reducers/friendsSlice';
import {resetRequests, setRequests} from '@redux/reducers/requestsSlice';
import {navigate} from '@services/navService';
import {sharePost} from '@services/postService';
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
import {HP, RF, WP} from '@theme/responsive';
import {ROUTES} from '@utils/routes';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, StatusBar, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {SkypeIndicator} from 'react-native-indicators';
import {showToast} from '@services/helperService';
import ProfileLoader from '@loaders/profileLoader';
import UserInfoLoader from '@loaders/userInfoLoader';
import {getCloser} from '@utils/helper';
import CustomAlert from '@components/customAlert';
import EditProfile from './editProfileModal';
// create a component
const Profile = ({route, navigation}: any) => {
  //states
  const {user, friends, requests} = useSelector((state: any) => state.root);
  const [posts, setPosts] = useState<any>([]);
  const [skip, setSkip] = useState<number>(0);
  const [bottomLoader, setBottomLoader] = useState<boolean>(false);
  const [endReached, setEndReached] = useState<boolean>(false);
  const [currentUserFriends, setCurrentFriends] = useState<any>([]);
  const dispatch = useDispatch();
  const modalizeRef = useRef<Modalize>(null);
  const [sharePostData, setSharePost] = useState<any>({});
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
  const onOpen = () => {
    dispatch(setBottomTab({isDisplay: false}));
    modalizeRef.current?.open();
  };

  const onClose = () => {
    dispatch(resetBottomTab());
  };

  //apis
  const getPosts = (id: string, skip: number, isRefreshing: boolean) => {
    getUserPost(id, skip)
      .then(({data}: any) => {
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
        setBottomLoader(false);
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
      .finally(() => {});
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

  const handleShare = () => {
    let obj = {
      id: sharePostData?.item?.PostObject[0]?._id,
    };
    sharePost(obj)
      .then(() => {
        onClose();
        modalizeRef.current?.close();
        showToast('Success', 'Shared Successfuly!', true);
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

  const handleRemove = () => {
    setOpenAlert(false);
    setLoader2(true);
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
        setLoader2(false);
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
                  currentUser?.avatar
                    ? {uri: currentUser?.avatar}
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
                {currentUser?.firstname} {currentUser?.lastname}
              </CustomText>
              {currentUser?.bio && (
                <CustomText size={13}>{currentUser?.bio}</CustomText>
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
            <PrimaryBtn
              title="Remove"
              titleSize={15}
              loader={loader2}
              customStyle={[styles.removebtn]}
              onPress={() => setOpenAlert(true)}
            />
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
        <View style={[GST.mt1]} />
      </>
    );
  };

  const EmptyComponent = () => {
    return (
      <>
        {loader ? (
          <SkypeIndicator />
        ) : (
          posts?.length == 0 &&
          !refresh && (
            <View style={[styles.listHeader]}>
              <CustomText style={[GST.mt4]} size={14}>
                No Post found!
              </CustomText>
            </View>
          )
        )}
      </>
    );
  };

  const FooterComponent = () => {
    if (bottomLoader && !refresh && !loader) {
      return (
        <SkypeIndicator
          size={RF(20)}
          color={COLORS.BLACK}
          style={[GST.mt3, GST.mb3]}
        />
      );
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
        leftIcon={user?.user?.id != route?.params?.id}
        onPress={() => navigate(ROUTES.SETTING)}
      />
      <View style={[GST.FLEX, styles.container]}>
        <>
          <Animated.FlatList
            renderItem={({item}: any) => (
              <PostCard
                item={item}
                onOpen={onOpen}
                setSharePost={setSharePost}
              />
            )}
            data={posts}
            onEndReached={() => {
              if (endReached && !refresh && bottomLoader) {
                let k = skip + 3;
                setSkip(k);
                getPosts(route?.params?.id, k, false);
                setEndReached(false);
              }
            }}
            onMomentumScrollBegin={() => {
              setBottomLoader(true);
              setEndReached(true);
            }}
            refreshing={refresh}
            onRefresh={() => {
              if (user?.user?.id != route?.params?.id) {
                fetchFriendShipStatus(route?.params?.id);
                getFriends(route?.params?.id);
              } else {
                getSocialNetwork(route?.params?.id);
              }
              setBottomLoader(false);
              setEndReached(false);
              setRefresh(true);
              fetchUser(route?.params?.id);
              setSkip(0);
              getPosts(route?.params?.id, 0, true);
            }}
            ListHeaderComponent={HeaderComponent}
            ListEmptyComponent={EmptyComponent}
            stickyHeaderIndices={[0]}
            ListFooterComponent={FooterComponent}
          />
        </>
      </View>
      <ShareModalize
        modalizeRef={modalizeRef}
        onClose={onClose}
        handleShare={handleShare}
        sharePostData={sharePostData}
      />
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
    </Wrapper>
  );
};
//make this component available to the app
export default Profile;
