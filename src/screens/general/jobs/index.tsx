//import liraries
import {NotFoundAnim} from '@assets/animations';
import {chatIcon, createIcon} from '@assets/icons';
import LotieAnimation from '@components/animation';
import CustomLoading from '@components/customLoading';
import Header from '@components/header';
import JobCard from '@components/jobCard';
import {HeaderComponent} from '@components/searchHeader';
import Wrapper from '@components/wrapper';
import {getAllJobs} from '@services/jobsService';
import {navigate} from '@services/navService';
import {COLORS} from '@theme/colors';
import {GST} from '@theme/globalStyles';
import {ROUTES} from '@utils/routes';
import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import useDebounce from '@hooks/useDebounce';
import {resetJobs, setJobsReducer} from '@redux/reducers/jobsSlice';
import CreateJobModal from '@components/createJobModal';

// create a component
const Jobs = ({route}: any) => {
  const {jobs} = useSelector((state: any) => state.root.jobs);
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(0);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [search, setSearch] = useState<any>('-1');
  const [loader, setLoader] = useState(false);
  const jobss = useRef([]);
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useDebounce(
    () => {
      if (search !== '-1') {
        setLoader(true);
        dispatch(resetJobs());
        jobss.current = [];
        setSkip(0);
        getJobs(0);
      }
    },
    [search],
    800,
  );

  const getJobs = (k: number) => {
    let query = '';
    if (search != '-1') {
      query = search;
    }
    getAllJobs(k, query)
      .then(({data}: any) => {
        if (data.length < 6) {
          setLoadMore(false);
        } else {
          setLoadMore(true);
        }
        let x: any = [...jobss.current, ...data];
        jobss.current = x;
        dispatch(setJobsReducer({jobs: jobss.current}));
      })
      .catch(err => {
        console.log('Error', err);
      })
      .finally(() => {
        setLoader(false);
        setRefresh(false);
      });
  };

  const FooterComponent = () => {
    if (loadMore && !refresh) {
      return (
        <ActivityIndicator
          size={'large'}
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
        rightIcon={createIcon}
        userIcon
        backAction={() => navigate('ProfileStack')}
        onPress={() => setModalVisible(true)}
      />
      <HeaderComponent searchHandler={setSearch} title={'Search Jobs'} />

      <FlatList
        renderItem={({item}: any) => <JobCard item={item} />}
        data={jobs}
        style={[styles.container]}
        onEndReached={() => {
          if (!refresh && loadMore) {
            let k = skip + 6;
            setSkip(k);
            getJobs(k);
          }
        }}
        ListFooterComponent={FooterComponent}
        refreshing={refresh}
        onRefresh={() => {
          setRefresh(true);
          dispatch(resetJobs());
          jobss.current = [];
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
      <CustomLoading visible={loader} />
      <CreateJobModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </Wrapper>
  );
};
//make this component available to the app
export default Jobs;
