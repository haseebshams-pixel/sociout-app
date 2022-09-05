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
import {Heart, MessageSquare, Share} from 'react-native-feather';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {getUser} from '@services/userService';
import PostUserLoader from '@loaders/postUserLoader';
import PostContentLoader from '@loaders/postContentLoader';
import ShareCard from '@components/shareCard';
import moment from 'moment';
//
interface Props {
  item: {
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

const PostCard = ({item}: Props) => {
  const {user} = useSelector((state: any) => state.root.user);
  const [postUser, setPostUser] = useState<Partial<PostUserInterface>>();
  const [like, setLike] = useState(false);
  const [userLoader, setUserLoader] = useState(false);
  const fetchUser = async () => {
    setUserLoader(true);
    getUser(item?.isShared ? item?.sharedBy : item?.postedBy)
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
                postUser?.avatar ? {uri: postUser?.avatar} : profilePlaceholder
              }
              style={[styles.userPhoto]}
            />
            <View>
              <CustomText size={15} style={[GST.ml2]}>
                {postUser?.firstname} {postUser?.lastname}
              </CustomText>
              <CustomText style={[GST.ml2]} color={COLORS.GRAY}>
                {moment(item?.date).fromNow()}
              </CustomText>
            </View>
          </>
        )}
      </View>
      {item?.isShared ? (
        <ShareCard item={item} />
      ) : userLoader ? (
        <PostContentLoader />
      ) : (
        <>
          <CustomText size={15} style={[GST.mb4]}>
            {item?.text}
          </CustomText>
          {item?.images?.length > 0 && (
            <View style={[GST.CENTER_ALIGN, GST.mb4, {width: WP(80)}]}>
              <CustomImageSlider images={item?.images} />
            </View>
          )}
        </>
      )}

      <View style={[GST.FLEX_ROW_SPACE, GST.mb2]}>
        <CustomText size={15}>0 Like</CustomText>
        <CustomText size={15}>0 Comment</CustomText>
      </View>
      <View style={[styles.seperator, GST.mb3]} />
      <View style={[GST.FLEX_ROW_SPACE]}>
        <TouchableWithoutFeedback
          style={[GST.FLEX_ROW]}
          onPress={() => setLike(!like)}>
          {!like ? (
            <Heart color={COLORS.BLACK} />
          ) : (
            <Heart color={COLORS.RED} fill={COLORS.RED} />
          )}
          <CustomText size={12}>Like</CustomText>
        </TouchableWithoutFeedback>
        <View style={[GST.FLEX_ROW]}>
          <MessageSquare color={COLORS.BLACK} />
          <CustomText size={12}>Comment</CustomText>
        </View>
        {!item?.isShared && (
          <View style={[GST.FLEX_ROW]}>
            <Share color={COLORS.BLACK} />
            <CustomText size={12}>Share</CustomText>
          </View>
        )}
      </View>
    </View>
  );
};

export default PostCard;
