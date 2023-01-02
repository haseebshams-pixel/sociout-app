//import liraries
import {NotFoundAnim} from '@assets/animations';
import {chatIcon} from '@assets/icons';
import LotieAnimation from '@components/animation';
import CustomLoading from '@components/customLoading';
import CustomText from '@components/customText';
import Header from '@components/header';
import PostCard from '@components/postCard';
import Wrapper from '@components/wrapper';
import {navigate} from '@services/navService';
import {getAllPosts} from '@services/postService';
import {COLORS} from '@theme/colors';
import {ROUTES} from '@utils/routes';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {styles} from './styles';

// create a component
const Home = () => {
  const [skip, setSkip] = useState(0);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [loader, setLaoder] = useState(false);
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const getPosts = (k: number) => {
    getAllPosts(k)
      .then(({data}: any) => {
        if (data.length < 5) {
          setLoadMore(false);
        } else {
          setLoadMore(true);
        }
        setPosts(p => {
          return p.concat(data);
        });
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
        renderItem={({item}: any) => <PostCard item={item} />}
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
        onRefresh={() => {
          setRefresh(true);
          setSkip(0);
          setRefresh(true);
          setPosts([]);
          setSkip(0);
          getPosts(0);
        }}
        ListHeaderComponent={() =>
          posts?.length == 0 && !loader && !refresh ? (
            <LotieAnimation Pic={NotFoundAnim} Message={'No Posts Found!'} />
          ) : null
        }
        ListHeaderComponentStyle={[styles.listHeader]}
      />
      <CustomLoading visible={loader} />
    </Wrapper>
  );
};
//make this component available to the app
export default Home;
