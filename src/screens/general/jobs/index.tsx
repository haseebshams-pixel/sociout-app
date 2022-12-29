//import liraries
import Header from '@components/header';
import JobCard from '@components/jobCard';
import {HeaderComponent} from '@components/searchHeader';
import {styles} from './styles';
import Wrapper from '@components/wrapper';
import {COLORS} from '@theme/colors';
import {HP, RF} from '@theme/responsive';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getAllJobs} from '@services/jobsService';
import {SkypeIndicator} from 'react-native-indicators';
import {GST} from '@theme/globalStyles';
import CustomText from '@components/customText';
import CustomLoading from '@components/customLoading';
import LotieAnimation from '@components/animation';
import {NotFoundAnim} from '@assets/animations';
import {chatIcon} from '@assets/icons';
import {navigate} from '@services/navService';
import {ROUTES} from '@utils/routes';

// create a component
const Jobs = ({route}: any) => {
  const {user} = useSelector((state: any) => state.root.user);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState<any>('');
  const [loader, setLoader] = useState(false);
  const [bottomLoader, setBottomLoader] = useState(false);
  const [alreadyLoading, setAlreadyLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getJobs = (k: number) => {
    setAlreadyLoading(true);
    getAllJobs(k, search)
      .then(({data}: any) => {
        setJobs(p => {
          return p.concat(data);
        });
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setLoader(false);
        setBottomLoader(false);
        setRefresh(false);
        setAlreadyLoading(false);
      });
  };

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

  useEffect(() => {
    setLoader(true);
    getJobs(skip);
  }, []);

  return (
    <Wrapper noPaddingBottom>
      <Header
        title={'Jobs'}
        rightIcon={chatIcon}
        userIcon
        backAction={() => navigate('ProfileStack')}
        onPress={() => navigate(ROUTES.CHAT)}
        borderBottom
      />
      <HeaderComponent searchHandler={setSearch} />

      <FlatList
        renderItem={({item}: any) => <JobCard item={item} />}
        data={jobs}
        style={[styles.container]}
        onEndReached={() => {
          if (!alreadyLoading) {
            if (endReached && !refresh && bottomLoader) {
              let k = skip + 3;
              setSkip(k);
              getJobs(k);
              setEndReached(false);
            }
          }
        }}
        onMomentumScrollBegin={() => {
          if (jobs?.length != 0) {
            setBottomLoader(true);
            setEndReached(true);
          }
        }}
        onEndReachedThreshold={0}
        ListFooterComponent={FooterComponent}
        refreshing={refresh}
        onRefresh={() => {
          setBottomLoader(false);
          setEndReached(false);
          setRefresh(true);
          setJobs([]);
          setSkip(0);
          setSearch('');
          getJobs(0);
        }}
        ListHeaderComponent={() =>
          jobs?.length == 0 && !loader && !refresh ? (
            <LotieAnimation Pic={NotFoundAnim} Message={'No Jobs Found!'} />
          ) : null
        }
        ListHeaderComponentStyle={[styles.listHeader]}
      />
      {!bottomLoader && !refresh && <CustomLoading visible={loader} />}
    </Wrapper>
  );
};
//make this component available to the app
export default Jobs;
