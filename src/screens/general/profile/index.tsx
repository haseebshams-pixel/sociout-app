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
import {navigate} from '@services/navService';
import {sharePost} from '@services/postService';
import {
  getUser,
  getUserFriends,
  getUserPost,
  getUserRequests,
} from '@services/userService';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF, WP} from '@theme/responsive';
import {ROUTES} from '@utils/routes';
import React, {useEffect, useRef, useState} from 'react';
import {DevSettings, StatusBar, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {SkypeIndicator} from 'react-native-indicators';
import {showToast} from '@services/helperService';
import ProfileLoader from '@loaders/profileLoader';
import PostContentLoader from '@loaders/postContentLoader';
import UserInfoLoader from '@loaders/userInfoLoader';
// create a component
const Profile = ({route, navigation}: any) => {
  //states
  const {user} = useSelector((state: any) => state.root);
  const [posts, setPosts] = useState<any>([]);
  const [friends, setFriends] = useState<any>([]);
  const [requests, setRequests] = useState<any>([]);
  const dispatch = useDispatch();
  const modalizeRef = useRef<Modalize>(null);
  const [sharePostData, setSharePost] = useState<any>({});
  const [refresh, setRefresh] = useState(false);
  const [loader, setLoader] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>({});
  const [userLoader, setUserLoader] = useState<any>(false);

  //modalize functions
  const onOpen = () => {
    dispatch(setBottomTab({isDisplay: false}));
    modalizeRef.current?.open();
  };

  const onClose = () => {
    dispatch(resetBottomTab());
  };

  //apis
  const getPosts = (id: string) => {
    setPosts([]);
    getUserPost(id)
      .then(({data}: any) => {
        setPosts(data);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setRefresh(false);
        setLoader(false);
      });
  };

  const getFriends = (id: string) => {
    setFriends([]);
    getUserFriends(id)
      .then(({data}: any) => {
        setFriends(data);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {});
  };

  const getRequests = () => {
    setRequests([]);
    getUserRequests()
      .then(({data}: any) => {
        setRequests(data);
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

  //useEffects

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoader(true);
      getFriends(route?.params?.id);
      if (user?.user?.id == route?.params?.id) {
        getRequests();
      }
      fetchUser(route?.params?.id);
      getPosts(route?.params?.id);
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
                disabled={friends?.length == 0}
                onPress={() => navigation.push(ROUTES.FRIENDS, friends)}>
                <CustomText size={14} bold>
                  {friends?.length}
                </CustomText>
                <CustomText size={14}>Friends</CustomText>
              </TouchableWithoutFeedback>
              {user?.user?.id == route?.params?.id && (
                <TouchableWithoutFeedback
                  style={[{alignItems: 'center'}]}
                  onPress={() => navigate(ROUTES.REQUESTS)}
                  disabled={requests?.length == 0}>
                  <CustomText size={14} bold>
                    {requests?.length}
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
              <CustomText size={13}>{currentUser?.bio}</CustomText>
            </>
          )}

          {user?.user?.id == route?.params?.id ? (
            <PrimaryBtn
              title="Edit Profile"
              titleSize={14}
              customStyle={[styles.editbtn]}
            />
          ) : (
            <PrimaryBtn
              title="Add Friend"
              titleSize={14}
              customStyle={[styles.editbtn]}
            />
          )}
        </View>
        {loader ? (
          <SkypeIndicator />
        ) : (
          <>
            <FlatList
              renderItem={({item}: any) => (
                <PostCard
                  item={item}
                  onOpen={onOpen}
                  setSharePost={setSharePost}
                />
              )}
              data={posts}
              refreshing={refresh}
              onRefresh={() => {
                setRefresh(true);
                setPosts([]);
                getPosts(route?.params?.id);
              }}
              ListHeaderComponent={() =>
                posts?.length == 0 && !refresh ? (
                  <CustomText style={[GST.mt4]} size={14}>
                    No Post found!
                  </CustomText>
                ) : (
                  <View style={[GST.mt2]} />
                )
              }
              ListHeaderComponentStyle={[styles.listHeader]}
            />
          </>
        )}
      </View>
      <ShareModalize
        modalizeRef={modalizeRef}
        onClose={onClose}
        handleShare={handleShare}
        sharePostData={sharePostData}
      />
    </Wrapper>
  );
};
//make this component available to the app
export default Profile;
