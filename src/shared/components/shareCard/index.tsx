import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF, WP} from '@theme/responsive';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';
import {profilePlaceholder} from '@assets/images';
import {useSelector} from 'react-redux';
import CustomImageSlider from '@components/customImageSlider';
import {getUser} from '@services/userService';
import PostUserLoader from '@loaders/postUserLoader';
import PostContentLoader from '@loaders/postContentLoader';
import moment from 'moment';
import CustomOverlayImageSlider from '@components/customOverlayImageSlider';

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

const ShareCard = ({item}: Props) => {
  const {user} = useSelector((state: any) => state.root.user);
  const [postUser, setPostUser] = useState<Partial<PostUserInterface>>();
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const [userLoader, setUserLoader] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const fetchUser = async () => {
    setUserLoader(true);
    getUser(item?.PostObject[0]?.postedBy)
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
  const postActionsCount = async () => {
    setLikeCount(item?.PostObject[0]?.shareLikedBy[0]?.likedBy.length);
    setCommentCount(item?.PostObject[0]?.shareComments?.length);
  };
  useEffect(() => {
    fetchUser();
    postActionsCount();
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
                {moment(item?.PostObject[0]?.oldDate).fromNow()}
              </CustomText>
            </View>
          </>
        )}
      </View>
      {userLoader ? (
        <PostContentLoader />
      ) : (
        <>
          <CustomText size={15} style={[GST.mb4]}>
            {item?.PostObject[0]?.text}
          </CustomText>
          {item?.PostObject[0]?.images.length > 0 && (
            <View style={[GST.CENTER_ALIGN, GST.mb4, {width: WP(80)}]}>
              <CustomImageSlider
                images={item?.PostObject[0]?.images}
                onPress={toggleOverlay}
              />
            </View>
          )}
        </>
      )}
      <View style={[styles.seperator, GST.mb2]} />
      <View style={[GST.FLEX_ROW_SPACE]}>
        <CustomText size={15}>
          {likeCount} Like{likeCount > 1 || likeCount == 0 ? 's' : ''}
        </CustomText>
        <CustomText size={15}>
          {' '}
          {commentCount} Comment
          {commentCount > 1 || commentCount == 0 ? 's' : ''}
        </CustomText>
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

export default ShareCard;
