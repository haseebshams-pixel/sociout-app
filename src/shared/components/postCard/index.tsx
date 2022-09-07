import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {RF, WP} from '@theme/responsive';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';
import {profilePlaceholder} from '@assets/images';
import {useSelector} from 'react-redux';
import CustomImageSlider from '@components/customImageSlider';
import {Heart, MessageSquare, Share} from 'react-native-feather';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {getUser} from '@services/userService';
import PostUserLoader from '@loaders/postUserLoader';
import PostContentLoader from '@loaders/postContentLoader';
import ShareCard from '@components/shareCard';
import moment from 'moment';
import CustomOverlayImageSlider from '@components/customOverlayImageSlider';
import {dislikePost, likePost} from '@services/postService';
import {showToast} from '@services/helperService';
import {Modalize} from 'react-native-modalize';
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
  setSharePost: any;
  onOpen: any;
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

const PostCard = ({item, setSharePost, onOpen}: Props) => {
  const {user} = useSelector((state: any) => state.root.user);
  const [postUser, setPostUser] = useState<Partial<PostUserInterface>>();
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [allcomments, setAllComments] = useState<any>([]);
  const [userLoader, setUserLoader] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
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
        setLikeCount(likeCount - 1);
      })
      .finally(() => {});
  };
  const handleDisLike = async () => {
    setLike(false);
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
        setLikeCount(likeCount + 1);
      })
      .finally(() => {});
  };
  const postActions = async () => {
    setLikeCount(item?.likedBy?.length);
    var filterArray = item?.likedBy.filter((id: string) => {
      return id == user?.id;
    });
    if (filterArray.length > 0) {
      setLike(true);
    }
    setCommentCount(item?.CommentObject?.length);
    setAllComments(item?.CommentObject);
  };
  useEffect(() => {
    fetchUser();
    postActions();
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={[styles.userInfoContainer]}>
        {userLoader ? (
          <PostUserLoader />
        ) : (
          <>
            <FastImage
              source={
                postUser?.avatar ? {uri: postUser?.avatar} : profilePlaceholder
              }
              style={[styles.userPhoto]}
            />
            <View>
              <CustomText size={15} style={[GST.ml2]}>
                {postUser?.firstname} {postUser?.lastname}
              </CustomText>
              <CustomText style={[GST.ml2]} color={COLORS.GRAY}>
                {moment(item?.PostObject[0]?.date).fromNow()}
              </CustomText>
            </View>
          </>
        )}
      </View>
      {item?.PostObject[0]?.isShared ? (
        <ShareCard item={item} />
      ) : userLoader ? (
        <PostContentLoader />
      ) : (
        <>
          <CustomText size={15} style={[GST.mb4]}>
            {item?.PostObject[0]?.text}
          </CustomText>
          {item?.PostObject[0]?.images?.length > 0 && (
            <View style={[GST.CENTER_ALIGN, GST.mb4, {width: WP(80)}]}>
              <CustomImageSlider
                images={item?.PostObject[0]?.images}
                onPress={toggleOverlay}
              />
            </View>
          )}
        </>
      )}

      <View style={[GST.FLEX_ROW_SPACE, GST.mb2]}>
        <CustomText size={15}>
          {likeCount} Like{likeCount > 1 || likeCount == 0 ? 's' : ''}
        </CustomText>
        <CustomText size={15}>
          {commentCount} Comment
          {commentCount > 1 || commentCount == 0 ? 's' : ''}
        </CustomText>
      </View>
      <View style={[styles.seperator, GST.mb3]} />
      <View style={[GST.FLEX_ROW_SPACE]}>
        <TouchableWithoutFeedback
          onPress={!like ? handleLike : handleDisLike}
          style={[{justifyContent: 'center'}]}>
          {!like ? (
            <Heart color={COLORS.BLACK} height={RF(15)} />
          ) : (
            <Heart color={COLORS.RED} fill={COLORS.RED} height={RF(15)} />
          )}
          <CustomText size={12}>Like</CustomText>
        </TouchableWithoutFeedback>
        <View style={[styles.iconContainer]}>
          <MessageSquare color={COLORS.BLACK} height={RF(15)} />
          <CustomText size={12}>Comment</CustomText>
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
            <Share color={COLORS.BLACK} height={RF(15)} />
            <CustomText size={12}>Share</CustomText>
          </TouchableWithoutFeedback>
        )}
      </View>
      {visible && (
        <CustomOverlayImageSlider
          images={item?.PostObject[0]?.images}
          visible={visible}
          toggleOverlay={toggleOverlay}
        />
      )}
    </View>
  );
};

export default PostCard;
