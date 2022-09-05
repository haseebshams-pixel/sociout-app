//import liraries
import {chatIcon} from '@assets/icons';
import CustomLoading from '@components/customLoading';
import CustomText from '@components/customText';
import Header from '@components/header';
import PostCard from '@components/postCard';
import ShareCard from '@components/shareCard';
import Wrapper from '@components/wrapper';
import {navigate} from '@services/navService';
import {getAllPosts} from '@services/postService';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {HP, RF, WP} from '@theme/responsive';
import {ROUTES} from '@utils/routes';
import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar, View} from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import {styles} from './styles';

// create a component
const Home = ({route}: any) => {
  const [skip, setSkip] = useState(0);
  const [loader, setLaoder] = useState(false);
  const [bottomLoader, setBottomLoader] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [posts, setPosts] = useState([]);
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
      });
  };

  useEffect(() => {
    setLaoder(true);
    getPosts(skip);
  }, []);

  const FooterComponent = () => {
    if (bottomLoader) {
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
      <StatusBar translucent barStyle={'dark-content'} />
      <Header
        title={'Home'}
        rightIcon={chatIcon}
        onPress={() => navigate(ROUTES.CHAT)}
      />
      <FlatList
        renderItem={({item}: any) => <PostCard item={item} />}
        data={posts}
        style={[styles.container]}
        onEndReached={() => {
          console.log('Reached end');
          setBottomLoader(true);
          setEndReached(true);
        }}
        onMomentumScrollEnd={() => {
          if (endReached) {
            let k = skip + 3;
            setSkip(k);
            getPosts(k);
            setEndReached(false);
          }
        }}
        onEndReachedThreshold={10}
        ListFooterComponent={FooterComponent}
      />
      <CustomLoading visible={loader} />
    </Wrapper>
  );
};
//make this component available to the app
export default Home;
