import {profilePlaceholder} from '@assets/images';
import CustomImageSlider from '@components/customImageSlider';
import CustomLoading from '@components/customLoading';
import CustomText from '@components/customText';
import Header from '@components/header';
import Input from '@components/input';
import PostActions from '@components/postActions';
import Wrapper from '@components/wrapper';
import {showToast} from '@services/helperService';
import {createPost} from '@services/postService';
import {GST} from '@theme/globalStyles';
import {RF, WP} from '@theme/responsive';
import {IOS} from '@utils/constants';
import {PHOTO_URL} from '@utils/endpoints';
import React, {useEffect, useRef, useState} from 'react';
import {InputAccessoryView, Keyboard, Modal, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';

const CreatePostModal = ({modalVisible, setModalVisible}: any) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state.root);
  let keyBoardRef = useRef<any>();
  const [inputAccessoryViewID] = useState<string>('uniqueID');
  const [isKeyBoardOpen, setIsKeyBoardOpen] = useState<boolean>(false);
  const [photos, setPhotos] = useState<
    {uri: string | any; type: string | any; name: string | any}[]
  >([]);
  const [text, setText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleKeyboardVisible = (event: any) => {
    setIsKeyBoardOpen(true);
  };

  const handleKeyboardHidden = (event: any) => {
    setIsKeyBoardOpen(false);
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      cropperCircleOverlay: false,
      multiple: true,
      forceJpg: true,
      // mediaType: 'photo',
    })
      .then(files => {
        let oldPhotos = [...photos];
        files.map((e, k) => {
          oldPhotos.push({
            uri: e.path,
            type: e.mime,
            name: e.filename,
          });
        });
        setPhotos([...oldPhotos]);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {});
  };
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      cropperCircleOverlay: false,
      multiple: true,
      forceJpg: true,
      // mediaType: 'photo',
    })
      .then(files => {
        let oldPhotos = [...photos];
        files.map((e, k) => {
          oldPhotos.push({
            uri: e.path,
            type: e.mime,
            name: e.filename,
          });
        });
        setPhotos([...oldPhotos]);
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {});
  };

  const submitHandler = () => {
    setIsSubmitting(true);
    if (photos.length === 0 && text === '') {
      setIsSubmitting(false);
    } else {
      const params = new FormData();
      for (let i = 0; i < photos.length; i++) {
        params.append('photos', photos[i]);
      }
      params.append('text', text);
      createPost(params)
        .then(() => {
          setModalVisible(!modalVisible);
          showToast('Success', 'Post Created!', true);
        })
        .catch(e => {
          console.log('ERROR', e);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  useEffect(() => {
    const keyboardVisibleListener = Keyboard.addListener(
      IOS ? 'keyboardWillShow' : 'keyboardDidShow',
      handleKeyboardVisible,
    );
    const keyboardHiddenListener = Keyboard.addListener(
      IOS ? 'keyboardWillHide' : 'keyboardDidHide',
      handleKeyboardHidden,
    );

    return () => {
      keyboardHiddenListener.remove();
      keyboardVisibleListener.remove();
    };
  }, []);

  useEffect(() => {
    setPhotos([]);
    setText('');
  }, [modalVisible]);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={[styles.modalView]}>
          <Wrapper>
            <>
              <Header
                title={'Create Post'}
                leftText={'Cancel'}
                rightText={'Post'}
                rightAction={submitHandler}
                backAction={() => {
                  setModalVisible(false);
                }}
              />
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps={'never'}
                extraScrollHeight={RF(50)}
                enableAutomaticScroll={true}
                innerRef={ref => {
                  keyBoardRef.current = ref;
                }}>
                <View style={styles.mainContainer}>
                  <View style={[styles.userInfoContainer]}>
                    <FastImage
                      source={
                        user?.user?.avatar
                          ? {uri: PHOTO_URL + user?.user?.avatar}
                          : profilePlaceholder
                      }
                      style={[styles.userPhoto]}
                    />
                    <View>
                      <CustomText size={13} style={[GST.ml2]}>
                        {user?.user?.firstname} {user?.user?.lastname}
                      </CustomText>
                    </View>
                  </View>
                  <Input
                    textContentType={'name'}
                    value={text}
                    autoCapitalize={'sentences'}
                    placeholder={'What do you want to talk about?'}
                    keyboardType="default"
                    onChangeText={e => setText(e)}
                    onChange={() => {
                      // keyBoardRef.current.scrollToEnd(true);
                    }}
                    multiline
                    inputStyle={[styles.inputStyle]}
                    containerStyle={styles.inputContainer}
                    titleSize={12}
                    inputAccessoryViewID={inputAccessoryViewID}
                    multiLineStyle={[styles.multilineStyle]}
                  />
                  <View style={[GST.CENTER_ALIGN, GST.mb2, {width: WP(100)}]}>
                    <CustomImageSlider isLocal files={photos} />
                  </View>

                  <InputAccessoryView nativeID={inputAccessoryViewID}>
                    {isKeyBoardOpen && (
                      <PostActions
                        containerStyle={GST.mb2}
                        openCamera={openCamera}
                        openGallery={openGallery}
                      />
                    )}
                  </InputAccessoryView>
                </View>
                <CustomLoading visible={isSubmitting} />
              </KeyboardAwareScrollView>
              {!isKeyBoardOpen && (
                <PostActions
                  openCamera={openCamera}
                  openGallery={openGallery}
                />
              )}
            </>
          </Wrapper>
        </View>
      </Modal>
    </>
  );
};

export default CreatePostModal;
