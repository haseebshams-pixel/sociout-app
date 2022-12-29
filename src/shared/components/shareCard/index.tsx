import CustomText from '@components/customText';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF, WP} from '@theme/responsive';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';
import {profilePlaceholder} from '@assets/images';
import CustomImageSlider from '@components/customImageSlider';
import {getUser} from '@services/userService';
import PostUserLoader from '@loaders/postUserLoader';
import PostContentLoader from '@loaders/postContentLoader';
import moment from 'moment';
import CustomOverlayImageSlider from '@components/customOverlayImageSlider';
import {PHOTO_URL} from '@utils/endpoints';

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
  const [postUser, setPostUser] = useState<Partial<PostUserInterface>>();
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
  useEffect(() => {
    fetchUser();
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
          {item?.PostObject[0]?.text && (
            <CustomText size={13} style={[GST.mt2]}>
              {item?.PostObject[0]?.text}
            </CustomText>
          )}

          {item?.PostObject[0]?.images.length > 0 && (
            <View style={[GST.CENTER_ALIGN, GST.mt2, GST.mb2, {width: WP(80)}]}>
              <CustomImageSlider
                images={item?.PostObject[0]?.images}
                onPress={toggleOverlay}
                isShare
              />
            </View>
          )}
        </>
      )}
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
