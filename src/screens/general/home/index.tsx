//import liraries
import {chatIcon} from '@assets/icons';
import CustomLoading from '@components/customLoading';
import CustomText from '@components/customText';
import Header from '@components/header';
import PostCard from '@components/postCard';
import Wrapper from '@components/wrapper';
import {resetBottomTab, setBottomTab} from '@redux/reducers/bottomTabSlice';
import {navigate} from '@services/navService';
import {getAllPosts, sharePost} from '@services/postService';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF, WP} from '@theme/responsive';
import {ROUTES} from '@utils/routes';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, View} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import {Modalize} from 'react-native-modalize';
import {useDispatch} from 'react-redux';
import {styles} from './styles';
import {Share2} from 'react-native-feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ShareModalize from '@components/shareModalize';
import {showToast} from '@services/helperService';

// create a component
const Home = () => {
  const [skip, setSkip] = useState(0);
  const [loader, setLaoder] = useState(false);
  const [bottomLoader, setBottomLoader] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const modalizeRef = useRef<Modalize>(null);
  const [refresh, setRefresh] = useState(false);
  const onOpen = () => {
    dispatch(setBottomTab({isDisplay: false}));
    modalizeRef.current?.open();
  };
  const onClose = () => {
    dispatch(resetBottomTab());
  };
  const [sharePostData, setSharePost] = useState<any>({});
  const getPosts = (k: number) => {
    getAllPosts(k)
      .then(({data}: any) => {
        setPosts(p => {
          return p.concat(data);
        });
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setLaoder(false);
        setBottomLoader(false);
        setRefresh(false);
      });
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

  useEffect(() => {
    setLaoder(true);
    getPosts(skip);
  }, []);

  const FooterComponent = () => {
    if (bottomLoader && !refresh) {
      return (
        <SkypeIndicator
          size={RF(20)}
          color={COLORS.BLACK}
          style={[GST.mt3, GST.mb3]}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <Wrapper noPaddingBottom>
      <Header
        title={'Home'}
        rightIcon={chatIcon}
        onPress={() => navigate(ROUTES.CHAT)}
        borderBottom
      />
      <FlatList
        renderItem={({item}: any) => (
          <PostCard item={item} onOpen={onOpen} setSharePost={setSharePost} />
        )}
        data={posts}
        style={[styles.container]}
        onEndReached={() => {
          if (endReached && !refresh && bottomLoader) {
            let k = skip + 3;
            setSkip(k);
            getPosts(k);
            setEndReached(false);
          }
        }}
        onMomentumScrollBegin={() => {
          setBottomLoader(true);
          setEndReached(true);
        }}
        onEndReachedThreshold={0}
        ListFooterComponent={FooterComponent}
        refreshing={refresh}
        onRefresh={() => {
          setBottomLoader(false);
          setEndReached(false);
          setRefresh(true);
          setPosts([]);
          setSkip(0);
          getPosts(0);
        }}
        ListHeaderComponent={() =>
          posts?.length == 0 && !loader && !refresh ? (
            <CustomText>No Post found!</CustomText>
          ) : null
        }
        ListHeaderComponentStyle={[styles.listHeader]}
      />
      <CustomLoading visible={loader} />
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
export default Home;
