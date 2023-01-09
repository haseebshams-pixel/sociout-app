import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF, WP} from '@theme/responsive';
import React, {useEffect, useRef, useState} from 'react';
import {Pressable, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';
import {profilePlaceholder} from '@assets/images';
import {useDispatch, useSelector} from 'react-redux';
import CustomImageSlider from '@components/customImageSlider';
import {Heart, MessageSquare, Share} from 'react-native-feather';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {getUser} from '@services/userService';
import PostUserLoader from '@loaders/postUserLoader';
import PostContentLoader from '@loaders/postContentLoader';
import ShareCard from '@components/shareCard';
import moment from 'moment';
import CustomOverlayImageSlider from '@components/customOverlayImageSlider';
import {
  deletePost,
  deleteSharePost,
  dislikePost,
  likePost,
  sharePost,
} from '@services/postService';
import {showToast} from '@services/helperService';
import {Modalize} from 'react-native-modalize';
import ShareModalize from '@components/shareModalize';
import CustomLoading from '@components/customLoading';
import {PHOTO_URL} from '@utils/endpoints';
import {ROUTES} from '@utils/routes';
import CustomOptions from '@components/customOption';
import {setPostsReducer} from '@redux/reducers/postsSlice';

//
interface Props {
  item: {
    likedBy: [];
    post: string;
    _id: string;
    PostObject: [
      {
        _id: string;
        text: string;
        images: [];
        videos: [];
        postedBy: string;
        date: string;
        isShared: boolean;
        likeId: string;
        oldDate: string;
        postId: string;
        sharedBy: string;
        shareLikedBy: [
          {
            _id: string;
            post: string;
            likedBy: [];
          },
        ];
        shareComments: [
          {
            _id: string;
            post: string;
            postedBy: string;
            text: string;
            date: string;
          },
        ];
      },
    ];
    CommentObject: [
      {
        _id: string;
        post: string;
        postedBy: string;
        text: string;
        date: string;
      },
    ];
  };
  navigation: any;
}
interface PostUserInterface {
  DOB: string;
  avatar: string | any;
  bio: string;
  email: string;
  firstname: string;
  id: string;
  lastname: string;
  phonenumber: string;
}

const PostCard = ({item, navigation}: Props) => {
  const {user, posts} = useSelector((state: any) => state.root);
  const dispatch = useDispatch();
  const [postUser, setPostUser] = useState<Partial<PostUserInterface>>();
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [allcomments, setAllComments] = useState<any>([]);
  const [userLoader, setUserLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const modalizeRef = useRef<Modalize>(null);
  const [sharePostData, setSharePost] = useState<any>({});
  const [loader, setLoader] = useState(false);

  const [allfiles, setAllFiles] = useState<{link: any; type: string}[]>([]);
  const setupFiles = () => {
    let filesArr: {link: any; type: string}[] = [];
    let images = item?.PostObject[0]?.images;
    let videos = item?.PostObject[0]?.videos;
    images.forEach((element: any) => {
      let obj = {
        link: element,
        type: 'image',
      };
      filesArr.push(obj);
    });
    videos.forEach((element: any) => {
      let obj = {
        link: element,
        type: 'video',
      };
      filesArr.push(obj);
    });
    setAllFiles(filesArr);
  };

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleShare = () => {
    modalizeRef.current?.close();
    setLoader(true);
    let obj = {
      id: sharePostData?.item?.PostObject[0]?._id,
    };
    sharePost(obj)
      .then(() => {
        showToast('Success', 'Shared Successfuly!', true);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const editJobHandler = () => {
    //  setModalVisible(true);
  };
  const deleteJobHandler = () => {
    let backupjobs = [...posts?.posts];
    var filterArr = posts?.posts.filter((itm: any) => {
      return itm?._id != item?._id;
    });
    dispatch(setPostsReducer({posts: filterArr}));
    item?.PostObject[0]?.isShared
      ? deleteSharePost(item?.PostObject[0]?._id)
          .then(() => {
            showToast('Succes', 'Deleted Successfuly', true);
          })
          .catch(e => {
            console.log('ERROR', e);
            showToast('Request Failed', e?.response.data, false);
            dispatch(setPostsReducer({posts: backupjobs}));
          })
          .finally(() => {})
      : deletePost(item?.PostObject[0]?._id)
          .then(() => {
            showToast('Succes', 'Deleted Successfuly', true);
          })
          .catch(e => {
            console.log('ERROR', e);
            showToast('Request Failed', e?.response.data, false);
            dispatch(setPostsReducer({posts: backupjobs}));
          })
          .finally(() => {});
  };

  const fetchUser = async () => {
    setUserLoader(true);
    getUser(
      item?.PostObject[0]?.isShared
        ? item?.PostObject[0]?.sharedBy
        : item?.PostObject[0]?.postedBy,
    )
      .then(({data}: any) => {
        setPostUser(data);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setUserLoader(false);
      });
  };
  const handleLike = async () => {
    let obj = {
      id: item?.PostObject[0]?._id,
    };
    setLike(true);
    let likes = likeCount + 1;
    setLikeCount(likeCount + 1);
    likePost(obj)
      .then((res: any) => {
        if (res.statusText === 'OK') {
          setLike(true);
          showToast('Success', 'Liked Post! 👌', true);
        }
      })
      .catch(err => {
        console.log('Error', err);
        setLike(false);
        if (likes > 1) {
          setLikeCount(likeCount - 1);
        } else {
          setLikeCount(0);
        }
      })
      .finally(() => {});
  };
  const handleDisLike = async () => {
    setLike(false);
    let likes = likeCount - 1;
    setLikeCount(likeCount - 1);
    dislikePost(item?.PostObject[0]?._id)
      .then((res: any) => {
        if (res.statusText === 'OK') {
          setLike(false);
          showToast('Success', 'Post disliked! 🤯', true);
        }
      })
      .catch(err => {
        console.log('Error', err);
        setLike(true);
        if (likes > 1) {
          setLikeCount(likeCount + 1);
        } else {
          setLikeCount(0);
        }
      })
      .finally(() => {});
  };
  const postActions = async () => {
    setLikeCount(item?.likedBy?.length);
    var filterArray = item?.likedBy.filter((id: string) => {
      return id == user?.user?.id;
    });
    if (filterArray.length > 0) {
      setLike(true);
    }
    setCommentCount(item?.CommentObject?.length);
    setAllComments(item?.CommentObject);
  };
  useEffect(() => {
    setupFiles();
    fetchUser();
    postActions();
  }, [item?._id]);

  return (
    <View style={[styles.container]}>
      <Pressable
        style={[styles.userInfoContainer]}
        disabled={userLoader}
        onPress={() =>
          navigation.push(ROUTES.PROFILESTACK, {
            id: item?.PostObject[0]?.isShared
              ? item?.PostObject[0]?.sharedBy
              : item?.PostObject[0]?.postedBy,
          })
        }>
        {userLoader ? (
          <PostUserLoader />
        ) : (
          <>
            <FastImage
              source={
                postUser?.avatar
                  ? {uri: PHOTO_URL + postUser?.avatar}
                  : profilePlaceholder
              }
              style={[styles.userPhoto]}
            />
            <View>
              <CustomText size={13} style={[GST.ml2]}>
                {postUser?.firstname} {postUser?.lastname}
              </CustomText>
              <CustomText style={[GST.ml2]} color={COLORS.GRAY}>
                {moment(item?.PostObject[0]?.date).fromNow()}
              </CustomText>
            </View>
          </>
        )}
      </Pressable>
      {item?.PostObject[0]?.isShared ? (
        <ShareCard item={item} />
      ) : userLoader ? (
        <PostContentLoader />
      ) : (
        <View>
          {item?.PostObject[0]?.text && (
            <CustomText size={13} style={[GST.mb2]}>
              {item?.PostObject[0]?.text}
            </CustomText>
          )}

          {(item?.PostObject[0]?.images?.length > 0 ||
            item?.PostObject[0]?.videos?.length > 0) && (
            <View style={[GST.CENTER_ALIGN, GST.mb2, {width: WP(100)}]}>
              <CustomImageSlider files={allfiles} onPress={toggleOverlay} />
            </View>
          )}
        </View>
      )}
      <View style={[GST.FLEX_ROW_SPACE]}>
        <View style={[GST.FLEX_ROW_SPACE]}>
          <TouchableWithoutFeedback
            onPress={!like ? handleLike : handleDisLike}
            style={[{justifyContent: 'center'}, GST.FLEX_ROW]}>
            {!like ? (
              <Heart stroke={COLORS.BLACK} height={RF(20)} />
            ) : (
              <Heart
                stroke={COLORS.PRIMARY}
                fill={COLORS.PRIMARY}
                height={RF(20)}
              />
            )}
            <CustomText style={[GST.ml1]} size={13}>
              {likeCount}
            </CustomText>
          </TouchableWithoutFeedback>
          <View style={[GST.FLEX_ROW, GST.ml2]}>
            <MessageSquare stroke={COLORS.BLACK} height={RF(20)} />
            <CustomText style={[GST.ml1]} size={13}>
              {commentCount}
            </CustomText>
          </View>
        </View>
        {!item?.PostObject[0]?.isShared && (
          <TouchableWithoutFeedback
            style={[styles.iconContainer]}
            onPress={() => {
              setSharePost({
                item: item,
                user: postUser,
              });
              onOpen();
            }}>
            <Share stroke={COLORS.BLACK} height={RF(20)} />
          </TouchableWithoutFeedback>
        )}
      </View>
      {user?.user?.id ===
        (item?.PostObject[0]?.isShared
          ? item?.PostObject[0]?.sharedBy
          : item?.PostObject[0]?.postedBy) && (
        <CustomOptions
          options={['Edit', 'Delete', 'Cancel']}
          actions={[editJobHandler, deleteJobHandler]}
          redIndex={1}
        />
      )}

      {visible && (
        <CustomOverlayImageSlider
          files={allfiles}
          visible={visible}
          toggleOverlay={toggleOverlay}
        />
      )}
      <ShareModalize
        modalizeRef={modalizeRef}
        handleShare={handleShare}
        sharePostData={sharePostData}
      />
      {!!loader && <CustomLoading visible={loader} />}
    </View>
  );
};

export default PostCard;
