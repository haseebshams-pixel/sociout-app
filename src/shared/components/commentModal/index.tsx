import {sendIcon} from '@assets/icons';
import {profilePlaceholder} from '@assets/images';
import CustomOptions from '@components/customOption';
import CustomText from '@components/customText';
import Header from '@components/header';
import Input from '@components/input';
import Wrapper from '@components/wrapper';
import {getPostComments} from '@services/postService';
import {COLORS} from '@theme/colors';
import {FONTS} from '@theme/fonts';
import {GST} from '@theme/globalStyles';
import {HP, RF, WP} from '@theme/responsive';
import {ANDROID, IOS} from '@utils/constants';
import {PHOTO_URL} from '@utils/endpoints';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Keyboard,
  Modal,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
const {REGULAR} = FONTS;
const CommentsModal = ({modalVisible, setModalVisible, item, postId}: any) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state.root);
  const [allComments, setAllComments] = useState(item);
  const [refreshing, setRefreshing] = React.useState(false);
  const [text, setText] = useState<string>('');
  const [isKeyBoardOpen, setIsKeyBoardOpen] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [inputFieldHeight, setInputFieldHeight] = useState(0);
  const inputFieldLines = useRef(0);

  const handleKeyboardVisible = (event: any) => {
    setIsKeyBoardOpen(true);
    setKeyboardHeight(event.endCoordinates.height);
    let x = (inputFieldLines.current - 1) * RF(12);
    if (x > 0) {
      setInputFieldHeight(event.endCoordinates.height - x);
    } else {
      setInputFieldHeight(event.endCoordinates.height);
    }
  };
  const handleKeyboardHidden = (event: any) => {
    setIsKeyBoardOpen(false);
    setKeyboardHeight(0);
    setInputFieldHeight(0);
  };

  const CommentItem = ({comment, index}: any) => {
    const editJobHandler = () => {
      //  setModalVisible(true);
    };
    const deleteJobHandler = () => {
      //
    };
    return (
      <View
        style={[
          styles.commentContainer,
          index > 0 && GST.mt2,
          index == item?.length - 1 && GST.mb2,
        ]}
        key={index}>
        <View style={{backgroundColor: COLORS.WHITE, ...GST.pr2}}>
          <FastImage
            source={
              comment?.commentUser[0]?.avatar
                ? {
                    uri: PHOTO_URL + comment?.commentUser[0]?.avatar,
                  }
                : profilePlaceholder
            }
            style={[styles.userPhoto]}
          />
        </View>
        <View style={[styles.textContainer]}>
          <CustomText semiBold size={13}>
            {comment?.commentUser[0]?.firstname}{' '}
            {comment?.commentUser[0]?.lastname}
          </CustomText>
          <CustomText size={12} color={COLORS.SECONDARY_GRAY}>
            {moment(comment?.date).fromNow()}
          </CustomText>

          <CustomText style={[GST.mt1]}>{comment?.text}</CustomText>
        </View>
        {user?.user?.id === comment?.postedBy && (
          <CustomOptions
            options={['Delete', 'Cancel']}
            actions={[deleteJobHandler]}
            redIndex={0}
          />
        )}
      </View>
    );
  };

  const handleGetPostComments = () => {
    getPostComments(postId)
      .then(({data}) => {
        setAllComments(data);
      })
      .catch(e => {
        console.log('ERROR', e);
      })
      .finally(() => {
        setRefreshing(false);
      });
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
                title={'Comments'}
                leftIcon
                backAction={() => {
                  setModalVisible(false);
                }}
              />
              <View
                style={[
                  styles.mainContainer,
                  !isKeyBoardOpen ? {flex: 1} : {},
                ]}>
                <FlatList
                  scrollToOverflowEnabled={true}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="always"
                  data={allComments}
                  renderItem={({item, index}: any) => (
                    <CommentItem comment={item} index={index} />
                  )}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={() => {
                        setRefreshing(true);
                        handleGetPostComments();
                      }}
                    />
                  }
                  style={{
                    height: inputFieldHeight,
                  }}
                />
              </View>
              <View style={[GST.FLEX_ROW, {alignItems: 'center'}]}>
                <Input
                  textContentType={'name'}
                  value={text}
                  autoCapitalize={'sentences'}
                  placeholder={'Leave your thoughts here...'}
                  keyboardType="default"
                  onChangeText={e => setText(e)}
                  multiline
                  inputStyle={[styles.inputStyle]}
                  containerStyle={styles.inputContainer}
                  titleSize={12}
                  mainContainerStyle={[styles.inputMainContainer]}
                  onContentSizeChange={event => {
                    let nmbr = Math.floor(
                      event.nativeEvent.contentSize.height / RF(12),
                    );
                    if (nmbr < inputFieldLines.current) {
                      let remLine = inputFieldLines.current - nmbr;
                      let x = remLine * RF(12);
                      setInputFieldHeight(inputFieldHeight + x);
                    } else if (nmbr > inputFieldLines.current) {
                      let x = (nmbr - 1) * RF(13);
                      setInputFieldHeight(keyboardHeight - x);
                    }

                    inputFieldLines.current = nmbr;
                  }}
                  multiLineStyle={[styles.multilineStyle]}
                />
                <Pressable style={[GST.mt1]}>
                  <FastImage source={sendIcon} style={[styles.iconStyle]} />
                </Pressable>
              </View>
            </>
          </Wrapper>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalView: {
    height: HP(100),
    width: WP(100),
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    padding: RF(15),
  },
  mainContainer: {
    paddingHorizontal: RF(15),
  },
  commentContainer: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: RF(5),
  },
  userPhoto: {
    width: RF(35),
    height: RF(35),
    resizeMode: 'contain',
    borderRadius: RF(100),
  },
  textContainer: {
    ...GST.ml2,
    borderRadius: RF(5),
    ...GST.pr4,
    ...GST.pt2,
    ...GST.pb2,
    maxWidth: WP(70),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ANDROID ? RF(8) : RF(9),
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: RF(5),
    textAlignVertical: 'top',
    marginTop: RF(5),
    marginBottom: 0,

    // marginBottom: RF(70),
  },
  inputMainContainer: {
    paddingHorizontal: RF(15),
    backgroundColor: COLORS.WHITE,
    marginBottom: 0,
    width: WP(90),
  },
  multilineStyle: {
    maxHeight: HP(20),
  },
  inputStyle: {
    lineHeight: RF(12),
    // flex: 1,
    // paddingRight: RF(10),
    fontFamily: REGULAR,
    color: COLORS.BLACK,
    fontSize: RF(12),
    paddingVertical: RF(0),
  },
  iconStyle: {height: RF(20), width: RF(20)},
});

export default CommentsModal;
