//import liraries
import {NotFoundAnim} from '@assets/animations';
import {chatIcon} from '@assets/icons';
import LotieAnimation from '@components/animation';
import CustomLoading from '@components/customLoading';
import Header from '@components/header';
import PostCard from '@components/postCard';
import Wrapper from '@components/wrapper';
import {resetPosts, setPostsReducer} from '@redux/reducers/postsSlice';
import {navigate} from '@services/navService';
import {getAllPosts} from '@services/postService';
import {COLORS} from '@theme/colors';
import {ROUTES} from '@utils/routes';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList, NativeModules} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';

const {CreateThumbnail} = NativeModules;

// create a component
const Home = ({navigation}: any) => {
  const {posts} = useSelector((state: any) => state.root.posts);
  const dispatch = useDispatch();
  const postss = useRef([]);
  const [skip, setSkip] = useState(0);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [loader, setLaoder] = useState(false);
  const [vidsRef, setVidsRef] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const getPosts = (k: number) => {
    getAllPosts(k)
      .then(({data}: any) => {
        if (data.length < 5) {
          setLoadMore(false);
        } else {
          setLoadMore(true);
        }
        let x: any = [...postss.current, ...data];
        postss.current = x;

        postss.current.map((val: any, ind) => {});

        dispatch(setPostsReducer({posts: postss.current}));
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setLaoder(false);
        setRefresh(false);
      });
  };
  useEffect(() => {
    setLaoder(true);
    getPosts(skip);
  }, []);

  const FooterComponent = () => {
    if (loadMore && !refresh) {
      return <ActivityIndicator color={COLORS.BLACK} size="large" />;
    } else {
      return null;
    }
  };
  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 70,
    minimumViewTime: 1000,
  });

  const onViewRef = useRef(
    (viewableItems: {changed: string | any[]; viewableItems: any[]}) => {
      if (viewableItems && viewableItems?.viewableItems?.length > 0) {
        let currentIndex = viewableItems?.viewableItems[0]?.index;
        setFocusIndex(currentIndex);
      }
    },
  );

  return (
    <Wrapper noPaddingBottom>
      <Header
        title={'Home'}
        rightIcon={chatIcon}
        userIcon
        backAction={() => navigate('ProfileStack')}
        onPress={() => navigate(ROUTES.CHAT)}
      />
      <FlatList
        windowSize={3}
        renderItem={({item, index}: any) => (
          <PostCard
            item={item}
            navigation={navigation}
            focus={focusIndex === index}
          />
        )}
        data={posts}
        style={[styles.container]}
        onEndReached={() => {
          if (!refresh && loadMore) {
            let k = skip + 5;
            setSkip(k);
            getPosts(k);
          }
        }}
        ListFooterComponent={FooterComponent}
        refreshing={refresh}
        onRefresh={async () => {
          setRefresh(true);
          setSkip(0);
          setRefresh(true);
          postss.current = [];
          dispatch(resetPosts());
          setSkip(0);
          getPosts(0);
        }}
        ListHeaderComponent={() =>
          posts?.length == 0 && !loader && !refresh ? (
            <LotieAnimation Pic={NotFoundAnim} Message={'No Posts Found!'} />
          ) : null
        }
        ListHeaderComponentStyle={[styles.listHeader]}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      <CustomLoading visible={loader} />
    </Wrapper>
  );
};
//make this component available to the app
export default Home;
