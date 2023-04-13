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
        sharedPostUser: [{avatar: string; firstname: string; lastname: string}];
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

const ShareCard = ({item, focus}: Props) => {
  const [postUser, setPostUser] = useState<Partial<PostUserInterface>>();
  const [userLoader, setUserLoader] = useState(false);
  const [visible, setVisible] = useState(false);
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

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    setupFiles();
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
                item?.PostObject[0]?.sharedPostUser[0]?.avatar
                  ? {
                      uri:
                        PHOTO_URL +
                        item?.PostObject[0]?.sharedPostUser[0]?.avatar,
                    }
                  : profilePlaceholder
              }
              style={[styles.userPhoto]}
            />
            <View>
              <CustomText size={13} style={[GST.ml2]}>
                {item?.PostObject[0]?.sharedPostUser[0]?.firstname}{' '}
                {item?.PostObject[0]?.sharedPostUser[0]?.lastname}
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

          {(item?.PostObject[0]?.images?.length > 0 ||
            item?.PostObject[0]?.videos?.length > 0) && (
            <View style={[GST.CENTER_ALIGN, GST.mt2, GST.mb3, {width: WP(80)}]}>
              <CustomImageSlider
                files={allfiles}
                onPress={toggleOverlay}
                isShare={true}
                focus={focus}
              />
            </View>
          )}
        </>
      )}
      {visible && (
        <CustomOverlayImageSlider
          files={allfiles}
          visible={visible}
          toggleOverlay={toggleOverlay}
        />
      )}
    </View>
  );
};

export default ShareCard;
