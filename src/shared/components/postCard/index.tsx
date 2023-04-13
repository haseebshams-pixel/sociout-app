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
import CommentsModal from '@components/commentModal';

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
        postUser: [{avatar: string; firstname: string; lastname: string}];
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
        sharedPostUser: [{avatar: string; firstname: string; lastname: string}];
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
  focus: boolean;
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

const PostCard = ({item, navigation, focus}: Props) => {
  const {user, posts} = useSelector((state: any) => state.root);
  const dispatch = useDispatch();
  const [postUser, setPostUser] = useState<Partial<PostUserInterface>>();
  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(0);
  const [allcomments, setAllComments] = useState<any>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const modalizeRef = useRef<Modalize>(null);
  const [sharePostData, setSharePost] = useState<any>({});
  const [loader, setLoader] = useState<boolean>(false);
  const [showComments, setShowComments] = useState<boolean>(false);

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
    postActions();
  }, [item?._id]);

  return (
    <View style={[styles.container]}>
      <Pressable
        style={[styles.userInfoContainer]}
        onPress={() =>
          navigation.push(ROUTES.PROFILESTACK, {
            id: item?.PostObject[0]?.postedBy,
          })
        }>
        <>
          <FastImage
            source={
              item?.PostObject[0]?.postUser[0]?.avatar
                ? {uri: PHOTO_URL + item?.PostObject[0]?.postUser[0]?.avatar}
                : profilePlaceholder
            }
            style={[styles.userPhoto]}
          />
          <View>
            <CustomText size={13} style={[GST.ml2]}>
              {item?.PostObject[0]?.postUser[0]?.firstname}{' '}
              {item?.PostObject[0]?.postUser[0]?.lastname}
            </CustomText>
            <CustomText style={[GST.ml2]} color={COLORS.GRAY}>
              {moment(item?.PostObject[0]?.date).fromNow()}
            </CustomText>
          </View>
        </>
      </Pressable>
      {item?.PostObject[0]?.isShared ? (
        <ShareCard item={item} focus={focus} />
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
              <CustomImageSlider
                files={allfiles}
                onPress={toggleOverlay}
                focus={focus}
              />
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
          <TouchableWithoutFeedback
            onPress={() => setShowComments(true)}
            style={[GST.FLEX_ROW, GST.ml2]}>
            <MessageSquare stroke={COLORS.BLACK} height={RF(20)} />
            <CustomText style={[GST.ml1]} size={13}>
              {commentCount}
            </CustomText>
          </TouchableWithoutFeedback>
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
      {user?.user?.id === item?.PostObject[0]?.postedBy && (
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
      <CommentsModal
        modalVisible={showComments}
        setModalVisible={setShowComments}
        item={item?.CommentObject}
        postId={item?.PostObject[0]?._id}
      />
      {!!loader && <CustomLoading visible={loader} />}
    </View>
  );
};

export default PostCard;
